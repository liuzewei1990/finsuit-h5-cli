<template>
  <div>
    <!-- banner图 -->
    <module-banner @onClickRule="$refs['rule-modal'].open()" @onClickBox="$router.push('/history')" @onClickShare="$refs['share-popup'].open()" />
    <!-- 签到纪录 -->
    <module-head ref="head" :signInNums="signInInfo.SINGIN_NUM" @switchFlag="signInSwitchFlag" @openMaxPrize="openMaxPrize" />
    <!-- 精选产品 A版本位置 -->
    <!-- <div id="A"></div> -->
    <module-goods-up />
    <!-- 抽奖 -->
    <module-lottery class="mar-top20" ref="lottery" @clickGameBtn="clickGameBtn" @gameOver="gameOver" />
    <!-- 精选产品 B版本位置 -->
    <!-- <div id="B"></div> -->
    <!-- 精彩活动 -->
    <module-market class="mar-top20" />

    <!-- 签到成功 Message -->
    <modal-sign ref="sign-modal"></modal-sign>
    <!-- 活动规则 Message -->
    <modal-rule ref="rule-modal"></modal-rule>
    <!-- 恭喜你,中奖啦 Message -->
    <modal-prize ref="prize-modal" @onClickShare="$refs['share-popup'].open()"></modal-prize>
    <!-- 分享popup -->
    <share-popup ref="share-popup" @shareCallback="shareCallback"></share-popup>
  </div>
</template>

<script>
import ModuleBanner from "@newSign/components/main/banner.vue"
import ModuleHead from "@newSign/components/main/head.vue"
import ModuleLottery from "@newSign/components/main/lottery/index.vue"
import ModalRule from "@newSign/components/main/ruleModal.vue"
import ModalSign from "@newSign/components/main/signModal.vue"
import ModalPrize from "@newSign/components/main/prizeModal.vue"
import SharePopup from "@newSign/components/main/sharePopup.vue"
const ModuleGoodsUp = () => import(/* webpackChunkName: "module-goods-up" */ "@newSign/components/main/goodsUp.vue");
const ModuleMarket = () => import(/* webpackChunkName: "module-market" */ "@newSign/components/main/market.vue");

import Vue from "vue"
import { Base64 } from "js-base64"

export default {
  components: { ModuleBanner, ModuleGoodsUp, ModuleHead, ModuleLottery, ModuleMarket, ModalRule, ModalSign, ModalPrize, SharePopup },
  data () {
    return {
      // 页面版本 0 -> 代表A版本(精选产品模块在抽奖模块上方) 1 -> 代表B版本(精选产品模块在抽奖模块下方)
      //   signInVersion: 1, 5-30号去掉ab版
      // 签到天数
      signNums: 0,
      // 奖项列表
      prizeInfo: {},
      // 签到日期进度列表
      signIndateList: [],
      // 用户签到信息
      signInInfo: {},
      // 用户抽中的奖品信息 比如：奖品类型 奖品名称等等
      hitPrize: {},
      // 用户抽中的奖品资源 比如：红包金额 卡密等等
      hitPrizeResources: {},
      // 开启大家api loading
      openMaxPrizeLoading: this.$Loading("大奖开启中..."),
      // app验签参数
      signData: {},
      // 当前用户当天是否已经分享过
      isShare: false
    };
  },
  created () {
    this.enter();
  },
  methods: {

    enter () {
      const APP_FLAG = sessionStorage.getItem("APP_FLAG");
      const VERSION = sessionStorage.getItem("VERSION");
      const SYSTEM_TYPE = sessionStorage.getItem("SYSTEM_TYPE");

      switch (APP_FLAG) {
        case "PC":
          // 拼财 ios 1.0.8 以下版本不支持 包含 1.0.8
          if (SYSTEM_TYPE.indexOf("ios") === 0 && this.$utils.isVersion("1.0.8", VERSION)) {
            this.signIn();
          } else {
            this.h5SaltSign();
          }
          break;
        case "BC":
          this.h5SaltSign();
          break;
        case "PMP":
          this.signIn();
          break;
        default:
          this.signIn();
          break;
      }
    },
    /**
     * 用户签到
     */

    // 1.签到 —> 签到前 调用原生方法 获取签名信息
    async h5SaltSign () {
      window.sendSaltSign = this.sendSaltSign;

      let params = {
        head: {
          TYPE: this.$api.signIn.apiType,
          TOKEN: sessionStorage.getItem("TOKEN") || "",
          SESSION_ID: sessionStorage.getItem("SESSION_ID") || "",
          DEVICE_ID: sessionStorage.getItem("DEVICE_ID") || "",
          SYSTEM_TYPE: sessionStorage.getItem("SYSTEM_TYPE") || "",
          APP_FLAG: sessionStorage.getItem("APP_FLAG") || "",
          VERSION: sessionStorage.getItem("VERSION") || "",
        },
        param: {
          MEMBER_ID: sessionStorage.getItem("ID"),
        }
      }

      console.log("验签参数", params);

      this.$bcBridge.h5SaltSign(params);

      // 检测原生是否正常调用window.sendSaltSign方法 如果没有调用 主动触发签到接口
      setTimeout(() => {
        if (Object.keys(this.signData).length == 0) {
          this.signIn();
        }
      }, 2000);
    },

    // 2.签到 —> 签到前 获取签名信息 App回调 window.sendSaltSign
    async sendSaltSign (data) {
      this.signData = JSON.parse(Base64.decode(data));
      console.log("App回调 window.sendSaltSign:", this.signData);
      this.signIn(this.signData);
    },

    // 3.签到 -> 调用签到接口
    async signIn (signData = {}) {
      try {
        let params = {
          MEMBER_ID: sessionStorage.getItem("ID"),
        }
        let head = {
          TIME: signData.time,
          NONCE: signData.nonce,
          SIGN: signData.sign,
        }
        let data = await this.$api.signIn(params, head);
        console.log("this.$api.signIn----------", data)
        if (this.$utils.isObject(data)) {
          //   this.signInVersion = data.SIGN_IN_VERSION || this.signInVersion; 5-30号去掉ab版
          (data.SINGIN_RESUT == 1) && this.openSignDialog(data.SINGIN_AGG_NUMS);
          this.isShare = data.SHARE_NUM == "1"; // 0 : 没有分享过 1：分享过
        } else {
          this.$Toast("signIn api data error")
        }
        this.getSignInData();
      } catch (error) {
        console.error("签到 -> 调用签到接口", error);
      }
    },

    // 4.签到 -> 签到成功dialog提示 3秒后关闭
    async openSignDialog (nums) {
      this.signNums = nums;
      this.$refs["sign-modal"].open(nums);
      setTimeout(() => {
        this.$refs["sign-modal"].close();
      }, 5000);
    },


    /**
     * 初始化活动数据
     */

    // 1.初始化 -> 获取签到活动数据
    async getSignInData () {
      try {
        let params = {
          MEMBER_ID: sessionStorage.getItem("ID")
        }
        let data = await this.$api.getSignInData(params);
        console.log("this.$api.getSignInData-------------", data);
        if (this.$utils.isObject(data)) {
          this.signInInfo = this.$utils.isObject(data.SINGED_INFO) ? data.SINGED_INFO : {};
          this.prizeInfo = this.$utils.isObject(data.PRIZE_INFO) ? data.PRIZE_INFO : {};
          this.signIndateList = this.$utils.isArray(data.DATE_AXIS_LIST) ? data.DATE_AXIS_LIST : [];
          this.initSignIn();
        } else {
          this.$Toast("getSignInData api data error")
        }
      } catch (error) {
        console.error("获取签到信息：", error)
      }
    },

    // 2.初始化 -> 初始化签到页面
    async initSignIn () {
      try {
        this.$refs["head"].init(this.signIndateList, this.signInInfo);
        this.$refs["lottery"].init(this.prizeInfo, this.signInInfo);
        this.signInInfo.PRIZE_POSITION && this.$refs["lottery"].setDefaultPosition(this.signInInfo.PRIZE_POSITION);
        // this.asyncComponentMount(); 5-30号去掉ab版
      } catch (error) {
        console.error("初始化签到页面：", error)
      }
    },

    // 3.初始化 -> 页面版本控制
    // async asyncComponentMount () {
    //   try {
    //     const Constructor = Vue.extend(ModuleGoodsUp);
    //     const example = new Constructor();
    //     example.$mount(this.signInVersion == "1" ? "#B" : "#A");
    //   } catch (error) {
    //     console.error("页面版本控制：", error);
    //   }
    // },

    /**
     * 用户抽奖
     */

    // 用户点击抽奖按钮
    async clickGameBtn () {
      this.gameStart();
    },

    // 1.用户抽奖 -> 请求后台接口九宫格转动
    async gameStart () {
      try {
        this.$refs["lottery"].startTurn();
        let keys = Object.keys(this.prizeInfo);
        let index = Math.floor(Math.random() * keys.length);
        let params = {
          MEMBER_ID: sessionStorage.getItem("ID"),
          LUCK_POSITION: keys[index]
        }
        let data = await this.$api.postUserLuckDraw(params)
        console.log("this.$api.postUserLuckDraw----------", data);
        if (this.$utils.isObject(data)) {
          this.hitPrize = this.$utils.isObject(data.HIT_PRIZE) ? data.HIT_PRIZE : {};
          this.hitPrizeResources = this.$utils.isObject(data.SEND_RECORD) ? data.SEND_RECORD : {};
          this.stopTurnPosition(this.hitPrize.ID);
        } else {
          this.$Toast("postUserLuckDraw api data error");
        }
      } catch (error) {
        console.error("用户抽奖 -> 请求后台接口九宫格转动:", error)
        // 出错时要停止九宫格
        this.$refs["lottery"].error();
      }
    },

    // 2.用户抽奖 -> 九宫格停止转动到指定位置
    async stopTurnPosition (prizeId) {
      try {
        this.$refs["lottery"].stopTurnPosition(prizeId);
      } catch (error) {
        console.error("用户抽奖 -> 九宫格停止转动到指定位置", error);
      }
    },

    // 3.用户抽奖 -> 九宫格停止后触发
    async gameOver (gamePrizeID) {
      if (gamePrizeID === this.hitPrize.ID) {
        this.$refs["lottery"].removeLotteryNums();
        this.openPrizeDialog(this.hitPrize, this.hitPrizeResources, false);
      }
    },

    // 4.用户抽奖 -> 打开中奖提示dailog
    async openPrizeDialog (hitPrize, hitPrizeResources, isMaxPrize) {
      this.$refs["prize-modal"].open(hitPrize, hitPrizeResources, isMaxPrize);
    },

    /**
     * 用户开启大奖
     */
    async openMaxPrize () {
      try {
        if (this.openMaxPrizeLoading.isShow) return;
        this.openMaxPrizeLoading.show();
        let params = {
          MEMBER_ID: sessionStorage.getItem("ID"),
        }
        let data = await this.$api.postUserMaxLuckDraw(params);
        this.openMaxPrizeLoading.close();
        if (this.$utils.isObject(data)) {
          this.hitPrize = this.$utils.isObject(data.HIT_PRIZE) ? data.HIT_PRIZE : {};
          this.hitPrizeResources = this.$utils.isObject(data.SEND_RECORD) ? data.SEND_RECORD : {};
          this.openPrizeDialog(this.hitPrize, this.hitPrizeResources, true);
          this.$refs["head"].disabledMaxPrizeBtn();
        } else {
          this.$Toast("postUserMaxLuckDraw api data error")
        }
      } catch (error) {
        this.openMaxPrizeLoading.close();
        console.error("用户开启大奖：", error);
      }
    },

    /**
     * 签到提醒 开关
     */
    async signInSwitchFlag (flag) {
      try {
        let params = {
          MEMBER_ID: sessionStorage.getItem("ID"),
          IS_REMID: flag ? "0" : "1"
        }
        let data = await this.$api.postSignInSwitch(params);
        console.log("this.$api.postSignInSwitch", data);
        this.$Toast({
          duration: 1000,
          message: flag ? "已开启提醒，每日10:00推送" : "已取消提醒"
        })
      } catch (error) {
        console.error("签到提醒开关：", error);
      }
    },

    /**
     * 用户分享成功增加抽奖机会
     */
    async shareCallback () {
      try {
        let params = {
          MEMBER_ID: sessionStorage.getItem("ID")
        }
        let data = await this.$api.postUserLuckDrawAddNums(params);
        console.log("this.$api.postUserLuckDrawAddNums", data)
        if (this.$utils.isObject(data) && data.SUCCESS == "0") {
          // 增加成功
          this.$Toast("恭喜您，获取一次抽奖机会！");
          this.isShare = true;
          this.$refs["lottery"].addLotteryNums();
        } else {
        }
      } catch (error) {
        console.error("用户分享成功增加抽奖机会：", error);
      }
    },

  }

};
</script>

<style lang="less" scoped>
</style>
