<template>
  <div class="main-oneTopic" :style="{background: `linear-gradient(to bottom, ${oneTopicBjColor} 60%,  #ffffff)`}">
    <div class="content">
      <!-- 荧光屏文字 -->
      <msg-scroll v-if="msgText && isHaveTopic" :text="msgText" :nbspNum="50"></msg-scroll>

      <!-- 标题 -->
      <banner v-show="bjImgSrc" :bjImgSrc="bjImgSrc" :titleImgSrc="titleImgSrc" :descText="descText"></banner>

      <!-- 每日一题->题目 -->
      <calendar v-show="bjImgSrc">
        <topic ref="topic" :isHaveTopic="isHaveTopic" :topicTitle="topicTitle" :topicDescText="topicDescText" :topicDescTextIsShow="topicDescTextIsShow" :topicOptions="topicOptions" @btnConfirm="btnConfirm" :showLoading="showBtnLoading"></topic>
      </calendar>

      <!-- btn -->
      <div class="btn btn-share" @click="openSharePopup" v-track:ACB0I002.click="()=>{}">
        <div class="btn-icon"></div>
        <span>分享</span>
      </div>

      <!-- btn -->
      <div class="btn btn-box" @click="openRuleDialog" v-track:ACB0I001.click="()=>{}">
        <!-- <div class="btn-icon"></div> -->
        <span>活动规则</span>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "@onTopic/components/Calendar"
import Banner from "@onTopic/components/Banner"
import MsgScroll from "./msgScroll"
import Topic from "@onTopic/components/Topic"
import bus from "@onTopic/utils/bus.js"
import { mapGetters } from "vuex"
export default {
  components: { MsgScroll, Calendar, Banner, Topic },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin () {
      this.renderData();
    }
  },
  data () {
    return {
      // 每日一题是否有题目
      isHaveTopic: '',

      // 荧光屏文字
      msgText: "",
      // 每日一题背景渐变色
      oneTopicBjColor: "#fff",
      // banner背景图
      bjImgSrc: "",
      // banner标题图
      titleImgSrc: "",
      // banner文案
      descText: "",

      // 用户可用答题次数
      userTopicNum: 0,
      // 题目ID
      topicId: "",
      // 题目标题
      topicTitle: "",
      // 答案解析
      topicDescText: "",
      // 答案解析是否显示
      topicDescTextIsShow: "",
      // 题目选项
      topicOptions: [],
      // 题目正确的答案
      topicKey: "",
      // topic 按钮loading
      showBtnLoading: false

    }
  },

  mounted () {
    this.renderData();
    // 监听分享回调事件
    bus.$on("shareSuccess", this.onShareSuccess)
  },

  methods: {
    async renderData () {
      let params = {};
      let data = await this.$api.getTopicInfo(params);
      console.debug("this.$api.getTopicInfo", data);

      if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
        this.$Toast(data.MSG || "数据异常 this.$api.getTopicInfo");
        return;
      }
      // banner配置信息
      let apiBannerData = data.COMMON_CONFIG_DATA || {};
      // 题目信息
      let apiTopicData = data.QUESTION_INFO || {};
      // 用户回显题目信息
      let apiUserTopicData = data.ANSWER_RESULT || {};

      this.renderBannerData(apiBannerData);
      this.renderTopicData(apiTopicData);
      this.$nextTick(() => {
        this.renderUserTopicData(apiUserTopicData, apiTopicData);
      });

      // show module
      this.moduleShow = true;
    },

    // 设置banner数据
    renderBannerData (apiBannerData) {
      //  模块背景渐变前色
      let oneTopicBjColor = apiBannerData.BACKGROUND_COLOR;
      // banner背景
      let bjImgSrc = apiBannerData.BACKGROUND_PICTURE ? this.$Config.aliyuncHost + apiBannerData.BACKGROUND_PICTURE : '';
      // banner标题图片
      let titleImgSrc = apiBannerData.FOREGROUND_PICTURE ? this.$Config.aliyuncHost + apiBannerData.FOREGROUND_PICTURE : '';
      // banner文案
      let descText = apiBannerData.AWARD_TEXT;
      // 荧光屏文字
      let msgText = apiBannerData.DOUBLE_TEXT;

      this.oneTopicBjColor = oneTopicBjColor || "#3866ff";
      this.bjImgSrc = bjImgSrc || require('@onTopic/assets/images/banner.png');
      this.titleImgSrc = titleImgSrc || require('@onTopic/assets/images/title.png');
      this.descText = descText;
      this.msgText = msgText;
    },
    // 设置每日一题数据
    renderTopicData (apiTopicData) {
      // 接口中没有题目信息
      if (Object.keys(apiTopicData).length === 0 || (apiTopicData.ITEM_LIST || []).length === 0) {
        this.isHaveTopic = false;
        return;
      }

      this.isHaveTopic = true;
      // 题目ID
      let topicId = apiTopicData.ID;
      // 题目标题
      let topicTitle = apiTopicData.QUESTION_TITLE;
      // 题目解析富文本
      let topicDescText = apiTopicData.QUESTION_ANALYSIS;
      // 题目解析富文本是否显示 0：显示；1：隐藏
      let topicDescTextIsShow = apiTopicData.QUESTION_ANALYSIS_IS_ENABLED;
      // 题目选项
      let topicOptions = apiTopicData.ITEM_LIST || [];
      // 题目正确答案
      let topicKey = apiTopicData.QUESTION_ANSWERR;

      this.topicId = topicId;
      this.topicTitle = topicTitle;
      this.topicDescText = topicDescText;
      this.topicDescTextIsShow = !Number(topicDescTextIsShow);
      this.topicOptions = topicOptions.map(item => {
        item["disabled"] = false;
        return item;
      });
      this.topicKey = topicKey;
    },
    // 设置用户每日一题回显数据
    renderUserTopicData (apiUserTopicData, apiTopicData) {
      // 没有用户回显信息
      if (Object.keys(apiUserTopicData).length === 0) {
        return;
      }
      //  检查用户是否有可用答题次数
      let userTopicNum = Number(apiUserTopicData.ANSWER_NUMBER);
      this.userTopicNum = userTopicNum;
      if (this.userTopicNum > 0) {
        return;
      }
      else {
        // 用户答案Key
        let userKey = apiUserTopicData.MEMBER_ANSWERR;
        // 题目正确答案key
        let topicKey = apiUserTopicData.QUESTION_ANSWERR;
        // 答题状态 0：正确 1:错误
        let userTopicStatus = apiUserTopicData.ANSWER_RESULT;
        // 题目选项列表
        let topicOptions = apiTopicData.ITEM_LIST || [];

        // 用户答题结果
        let userRes = JSON.parse(JSON.stringify(topicOptions.find(item => userKey === item.ITEM_KEY)));
        console.debug("用户答题结果:", userRes);
        // 用户答题是否正确
        let isCorrect = !Number(userTopicStatus);
        console.debug("用户答题是否正确:", isCorrect);
        // 是否显示正确答案，如果给了正确答案的索引则显示，不给不显示。
        let indexCorrect = topicOptions.findIndex(item => topicKey === item.ITEM_KEY);
        console.debug("题目正确答案的index:", indexCorrect);

        this.$refs["topic"].topicOver(userRes, isCorrect, indexCorrect);
      }
    },

    // 每日一题组件 按钮点击回调，参数为选中的答案,将答案提交到服务器
    async btnConfirm (res) {
      if (Object.keys(res).length === 0) {
        this.$Toast("选项不可为空");
        return;
      }
      try {
        console.debug("用户选择的题目:", res);
        let userRes = res;

        this.showBtnLoading = true;
        let params = { QUESTION_ID: this.topicId, ANSWER_RESULT: userRes.ITEM_KEY };
        let data = await this.$api.postTopicInfo(params);
        console.debug("this.$api.postTopicInfo", data);
        this.showBtnLoading = false;

        if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
          this.$Toast(data.MSG || "数据异常 this.$api.postTopicInfo");
          return;
        }

        // 答题结果 是否正确
        let apiTopicResult = data.ANSWER_RESULT || {};
        // 答题错误-错误信息
        let apiWrongInfo = data.WRONG_INFO || {};
        // 答题正确-奖励信息
        let apiRewardInfo = data.ALL_REWARD_MAP || {};

        // 用户答题是否正确 0：正确；1：错误
        let isCorrect = !Number(apiTopicResult.ANSWER_RESULT);
        // 是否翻倍 0：翻倍；1：否
        let isDouble = !Number(apiRewardInfo.DOUBLE_FLAG);
        // 是否手动选择领取奖励 0：是；1：否
        let isSelectReward = apiRewardInfo.SELECT_REWARD;
        // 分享获得答题机会标识 0：是；1：否
        let shareFlag = apiWrongInfo.SHARE_ANSWER_FLAG;

        // 奖励列表
        let rewardList = this.transformApiRewardDataToList(apiRewardInfo.COUPON_INFO, apiRewardInfo.REWARD_INFO);

        // 【正确】
        if (isCorrect) {
          this.$refs["topic"].topicOver(userRes, isCorrect);
          if (rewardList.length === 0) {
            this.$Toast("未配置答题奖励");
            return;
          }
          // 为：手动领取奖励
          if (Number(isSelectReward) === 0 && rewardList.length === 2) {
            this.topicRewardListDialog(rewardList, isDouble);
          }
          // 为：自动领取奖励
          else if (Number(isSelectReward) === 1 && rewardList.length === 1) {
            this.topicRewardOpenDialog(rewardList[0], isDouble);
          }
          else {
            this.$Toast("奖励发放异常");
          }
        }
        // 【错误】
        else {
          let indexCorrect = this.topicOptions.findIndex(item => this.topicKey === item.ITEM_KEY);
          console.debug("题目正确答案的index:", indexCorrect);
          this.$refs["topic"].topicOver(userRes, isCorrect, indexCorrect);
          !Number(shareFlag) && this.topicErrorDialog();
        }
      } catch (error) {
        console.error(error);
        this.showBtnLoading = false;
      }
    },

    // 处理api奖励列表 - 转换奖励列表字段
    transformApiRewardDataToList (COUPON_INFO, REWARD_INFO) {
      /**
       * couponId:  统一券id
       * couponType: 统一券类型
       * couponTitle: 统一券名称
       * couponContent:  统一券内容文案
       * couponValue:附加值 - 存档
       * */

      let arr = [];
      // 电子券红包
      if (this.$utils.isObject(REWARD_INFO) && Object.keys(REWARD_INFO).length !== 0 && REWARD_INFO.REWARD_TYPE === "1") {
        let couponItem = new Object();
        couponItem["couponId"] = REWARD_INFO.REWARD_ID;
        couponItem["couponType"] = REWARD_INFO.REWARD_TYPE;
        couponItem["couponTitle"] = REWARD_INFO.REWARD_NAME;
        couponItem["couponContent"] = REWARD_INFO.REWARD_AMOUNT + "元";
        couponItem["couponValue"] = REWARD_INFO.REWARD_AMOUNT;
        arr.push(couponItem);
      }
      // 优惠券
      if (this.$utils.isObject(COUPON_INFO) && Object.keys(COUPON_INFO).length !== 0 && COUPON_INFO.REWARD_TYPE === "2") {
        let couponItem = new Object();
        couponItem["couponId"] = COUPON_INFO.COUPON_ID;
        couponItem["couponType"] = COUPON_INFO.REWARD_TYPE;
        couponItem["couponTitle"] = COUPON_INFO.COUPON_TYPE_NAME;
        couponItem["couponContent"] = COUPON_INFO.COUPON_NAME;
        couponItem["couponValue"] = COUPON_INFO.COUPON_TYPE_NAME;
        arr.push(couponItem);
      }

      return arr;
    },

    /**
     * 答题正确-奖励列表弹窗
     * couponList:奖励列表
     * isDouble:是否翻倍
     */
    topicRewardListDialog (couponList = [], isDouble = false) {
      //   let couponList = [
      //     { couponType: "", couponTitle: "红包", couponContent: "0.05元" },
      //     { couponType: "", couponTitle: "优惠券", couponContent: "5000元优惠券5000元优惠券" },
      //     { couponType: "", couponTitle: "优惠券", couponContent: "5000元优惠券5000元优惠券" },
      //     { couponType: "", couponTitle: "优惠券标题", couponContent: "10个" },
      //   ];

      let dialogComponent = this.$CommonDialog({
        type: "TOPIC-LOTTERY-LIST",
        appendElement: this.$root.$el.querySelector("#page"),
        title: "恭喜您回答正确",
        desc: `获得奖励 「${couponList.length}选1」`,
        content: couponList,
        contentCallBack: (couponItem) => {
          console.debug("用户点击领券的奖励：", couponItem);
          getReward.call(this, couponItem);
        },
        linkTxt: "分享给好友",
        linkCallback: () => {
          dialogComponent.close();
          this.openSharePopup();
        }
      })

      // 手动领取奖励
      let btnLoading = this.$Loading();
      async function getReward (couponItem) {
        if (btnLoading.isShow) return;
        btnLoading.show();
        try {
          let DOUBLE_FLAG = isDouble ? "0" : "1";
          let params = { QUESTION_ID: this.topicId, DOUBLE_FLAG: DOUBLE_FLAG, REWARD_TYPE: couponItem.couponType };
          if (couponItem.couponType === "1") {
            params["REWARD_AMOUNT"] = couponItem.couponValue;
          }
          if (couponItem.couponType === "2") {
            params["COUPON_ID"] = couponItem.couponId;
          }
          let data = await this.$api.getReward(params);
          console.debug("this.$api.getReward", data);

          if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
            this.$Toast(data.MSG || "数据异常 this.$api.getReward");
            return;
          }

          // 领取成功 - 显示弹窗
          this.topicRewardOpenDialog(couponItem, isDouble);
        } catch (error) {
          console.error(error);
        }
        btnLoading.close();
      }
    },

    /**
     * 答题正确-奖励领取成功弹窗
     * couponItem:奖励
     * isDouble:是否翻倍
     */
    topicRewardOpenDialog (couponItem = {}, isDouble = false) {
      let dialogComponent = this.$CommonDialog({
        type: "TOPIC-LOTTERY-OPEN",
        appendElement: this.$root.$el.querySelector("#page"),
        title: "恭喜您回答正确",
        desc: `奖励领取成功`,
        content: couponItem,
        isDouble: isDouble,
        // 点击去我的钱包查看
        contentCallBack: () => {
          this.$bcBridge.toAppWalletPage();
        },
        linkTxt: "分享给好友",
        linkCallback: () => {
          dialogComponent.close();
          this.openSharePopup();
        }
      })
    },

    // 答题错误-提示弹窗
    topicErrorDialog () {
      let dialogComponent = this.$CommonDialog({
        type: "TOPIC-USER-ERROR",
        appendElement: this.$root.$el.querySelector("#page"),
        title: "回答错误，再接再厉哦～",
        desc: "",
        content: require("@onTopic/assets/images/dialog-1.png"),
        btnTxt: "去分享",
        btnCallback: () => {
          dialogComponent.close();
          this.openSharePopup();
        },
        linkTxt: "分享可得1次复活答题机会"
      })
    },

    // 活动规则弹窗
    async openRuleDialog () {

      let dialogComponent = this.$CommonDialog({
        type: "TOPIC-RULE",
        appendElement: this.$root.$el.querySelector("#page"),
        title: "",
        content: ""
      })

      let data = await this.$api.getRule();
      console.debug("this.$api.getRule", data);

      if (this.$utils.isObject(data) && data.STATUS == "0") {
        let title = data.RULE_DATA.RULE_TITLE;
        let content = data.RULE_DATA.RULE_CONTENT || [];
        dialogComponent.title = title || "每日一题活动规则";
        dialogComponent.content = content.join("\n");
      } else {
        this.$Toast(data.MSG || "数据异常 this.$api.getRule");
      }
    },

    // 打开sharePopup
    openSharePopup () {
      bus.$emit("openSharePopup")
    },

    // 当答题错误时，用户分享成功事件通知 - 调用后台接口为用户增加答题机会 - 重置每日一题
    async onShareSuccess () {
      // 如果没有登录不执行
      if (this.isLogin === false) return;

      let params = {};
      let data = await this.$api.postTopicNum(params);
      console.debug("this.$api.postTopicNum", data);

      if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
        this.$Toast(data.MSG || "数据异常 this.$api.postTopicNum");
        return;
      }

      let apiUserTopicData = data.ANSWER_NUMBER_INFO || {};

      // 可答题次数
      let userTopicNum = Number(apiUserTopicData.ANSWER_NUMBER);

      // 如果返回的次数与之前的次数相等
      if (userTopicNum === this.userTopicNum) {
        return;
      }

      // 大于1 可以答题
      if (userTopicNum > 0) {
        this.$refs["topic"].reset();
        this.userTopicNum += 1; // 次数加1是防止重复分享导致的重复提示
        this.$Toast("恭喜您获得一次答题机会");
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-oneTopic {
  .content {
    position: relative;
    overflow: hidden;
    display: flex;
    z-index: 0;
    flex-direction: column;

    .btn {
      min-width: 100px;
      height: 40px;
      // line-height: 40px;
      border-top-left-radius: 500px;
      border-bottom-left-radius: 500px;
      position: absolute;
      right: -2px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      box-sizing: border-box;
    }

    .btn .btn-icon {
      width: 24px;
      height: 24px;
      margin: 0 5px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .btn span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      margin-left: 1px;
    }

    .btn-share {
      top: 79px;
      background: linear-gradient(to right, #eba448, #eb6348);
      border: 2px solid #fff;
      box-shadow: 0px 0px 0px 2px #eba448;
      .btn-icon {
        margin: 0 10px;
        background-image: url("../../../assets/images/share-icon.png");
      }
    }

    .btn-box {
      top: 148px;
      background: linear-gradient(to right, #41b6ff, #41b6ff);
      border: 2px solid #fff;
      box-shadow: 0px 0px 0px 2px #41b6ff;
      .btn-icon {
        background-image: url("../../../assets/images/share-icon.png");
      }
    }
  }
}
</style>
