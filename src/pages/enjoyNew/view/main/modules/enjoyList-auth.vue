<template>
  <div class="enjoy-list-item">
    <div class="title ellipsis">
      <span>实名红包</span>
    </div>
    <div class="desc ellipsis">完成实名得{{authData.AMOUNT || "- -"}}元红包</div>
    <Button class="btn" type="primary" :showLoading="false" @click.native="$checkLogin({action:handleBtnClick})" v-track:ACB0L004.click.native="{fn:()=>{},id:authData.ID}" :disabled="false">立即领取</Button>
  </div>
</template>

<script>
/**
 * 红包子组件，被enjoy-list组件所引用
 */
import Button from "@enjoyNew/components/Button"
export default {
  components: { Button },
  props: ["authData"],
  data () {
    return {

      // 按钮loading
      btnLoading: this.$Loading(),

      // 版本开关 1.0.8 版本的拼财不支持该方法 h5Certify()   (v1 < v2) 
      vFlag: this.$utils.isVersion(this.$Config.PC_V, this.$store.state.VERSION)
    }
  },
  mounted () {
    // H5实名认证成功回调活动首页后自动领取实名红包
    if ((this.$store.state.APP_FLAG === "PC" && this.vFlag === false) || this.$store.state.APP_FLAG === "BC") {
      // 。。。
    }
    else if (this.$store.state.APP_FLAG === "PC" && this.vFlag === true) {
      this.authRewardCallBack(this.$route.query["h5AuthStatus"], this.$route.query["rewardId"]);
    }
    else {
      this.authRewardCallBack(this.$route.query["h5AuthStatus"], this.$route.query["rewardId"]);
    }
  },
  methods: {
    // btn点击
    handleBtnClick () {
      if (!this.authData.ID) {
        this.$Toast("红包id不存在");
        return;
      }
      this.getAuthReward(this.authData.ID);
    },

    /**
     * 领取实名红包
     */
    async getAuthReward (authDataId) {
      try {
        let data = {};
        let params = { REWARD_ID: authDataId };
        if (this.btnLoading.isShow) return;
        this.btnLoading.show();
        data = await this.$api.postEnjoyAuthReward(params);
        console.debug("this.$api.postEnjoyAuthReward", data);
        this.btnLoading.close();
        if (this.$utils.isObject(data)) {
          this.checkAuthRewardStatus(data);
          return data;
        } else {
          this.$Toast("this.$api.postEnjoyAuthReward data error");
        }
      } catch (error) {
        console.error(error);
        this.btnLoading.close();
      }
    },

    // 领取实名红包 --- 判断状态
    checkAuthRewardStatus (data) {
      switch (String(data.DRAW_STATUS)) {
        // 需要实名认证
        case "0":
          this.toAuthPage();
          break;
        // 你已领取
        case "1":
          this.$Toast("您已领取，不要贪心哦～");
          break;
        // 领取成功
        case "2":
          this.openAuthDialogSuccess(data);
          break;
        // 你已实名,不符合领取条件
        case "4":
          this.$Toast("您已实名，不符合领取条件");
          break;
        // 其他
        default:
          this.$Toast("红包领取失败，请稍后再试");
          break;
      }
    },

    // 领取实名红包 --- 领取成功弹窗
    async openAuthDialogSuccess (resData = {}) {
      let content = await this.canvasToImage(resData.AMOUNT);
      let DialogComponentSuccess = this.$CommonDialog({
        type: "1",
        appendElement: this.$root.$el.querySelector("#page"),
        className: "main-auth-dialog",
        title: "恭喜您",
        desc: `获得${resData.AMOUNT}元实名红包`,
        content: content,
        btnTxt: "",
        btnDisabled: false,
        linkTxt: "",
        btnCallback: () => { },
        linkCallback: () => { }
      });

      // 按钮默认配置
      let setDefaultConfig = () => {
        DialogComponentSuccess.btnTxt = (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") ? "去我的钱包查看" : `下载${this.$Config.dowloadAppName}APP获取奖励`;
        DialogComponentSuccess.btnCallback = () => {
          if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
            this.$bcBridge.toAppWalletPage();
            this.$trackEvents.ACB0L013("去我的钱包查看", this.authData.ID);
          } else {
            this.$dowloadAppHelp();
            this.$trackEvents.ACB0L013(`下载${this.$Config.dowloadAppName}APP获取奖励`, this.authData.ID);
          }
        };
      }

      // 按钮api配置
      let setApiConfig = (apiConfig = {}) => {
        DialogComponentSuccess.btnTxt = apiConfig.TEXT;
        DialogComponentSuccess.btnCallback = () => {
          if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
            this.$bcBridge.openWebview(apiConfig.LINK);
            this.$trackEvents.ACB0L013("去我的钱包查看", this.authData.ID);
          } else {
            this.$trackEvents.ACB0L013(`下载${this.$Config.dowloadAppName}APP获取奖励`, this.authData.ID);
            setTimeout(() => {
              window.location.href = apiConfig.LINK;
            }, 500);
          }
        };
      }

      // 获取弹窗按钮配置文案以及链接，如果配置了走配置，没有配置走默认配置。
      let params = { TYPE: "A" };
      let data = await this.$api.getDialogData(params);
      console.debug("this.$api.getDialogData", data);
      if (this.$utils.isObject(data)) {
        if (data.LINK && data.TEXT) {
          setApiConfig(data);
        } else {
          setDefaultConfig();
        }
      } else {
        this.$Toast("this.$api.getDialogData data error");
      }
    },

    // 领取实名红包 --- 去实名认证
    toAuthPage () {


      // APP实名认证跳原生 接受回调函数
      if ((this.$store.state.APP_FLAG === "PC" && this.vFlag === false) || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.h5Certify({
          success: (v) => {
            let h5AuthStatus = "true";
            this.authRewardCallBack(h5AuthStatus, this.authData.ID);
          },
          fail: () => {
            this.$Toast("认证失败");
          },
        });
      }

      //  拼财app版本1.0.8版本跳转h5实名认证
      else if (this.$store.state.APP_FLAG === "PC" && this.vFlag === true) {
        let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        url += ``;
        url += `?h5AuthStatus=true`;
        url += `&rewardId=${this.authData.ID}`;
        this.$toRealNameAuthUrl(url);
      }

      // 小程序实名认证跳H5认证页，认证成功回调地址
      else {
        let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/";
        url += ``;
        url += `?PMP_FLAG=1`;
        url += `&MEMBER_ID=${this.$store.state.ID}`;
        url += `&TOKEN=${this.$store.state.TOKEN}`;
        url += `&SYSTEM_TYPE=${this.$store.state.SYSTEM_TYPE}`;
        url += `&MODEL=${this.$store.state.MODEL}`;
        url += `&OPEN_API_CHANNEL_ID=${this.$store.state.OPEN_API_CHANNEL_ID}`;

        url += `&h5AuthStatus=true`;
        url += `&rewardId=${this.authData.ID}`;

        url += `&isAuthReturn=true`;
        this.$toRealNameAuthUrl(url);
      }
    },

    // 领取实名红包 --- 绘制红包金额
    canvasToImage (money = 0) {
      return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let img = new Image();
        let base64 = "";
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.fillStyle = "#FFF2D4";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#E74E17';
          ctx.font = "normal bold 40px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`￥${money}`, canvas.width / 2, canvas.height / 2.5);
          base64 = canvas.toDataURL("image/jpeg", 0.8);
          resolve(base64);
        }
        img.onerror = reject;
        img.src = require("@enjoyNew/assets/images/d-c-2.png");
      })
    },

    /**
     * 小程序环境中，实名认证跳转到H5实名页面
     * 实名完成后回调到活动首页，活动首页判断参数是否实名成功
     * 实名成功主动调用领取实名奖励接口
     */
    async authRewardCallBack (h5AuthStatus, rewardId) {
      if (localStorage.getItem("h5AuthStatus") === h5AuthStatus && localStorage.getItem("rewardId") === rewardId) return;
      if (!rewardId) return;

      if (h5AuthStatus === "true" && !!rewardId) {
        let data = await this.getAuthReward(rewardId);
        if (this.$utils.isObject(data)) {
          localStorage.setItem("h5AuthStatus", h5AuthStatus);
          localStorage.setItem("rewardId", rewardId);
        }
      }
      if (h5AuthStatus === "false") {
        this.$Toast("您未完成实名认证，无法领取红包哦~");
        localStorage.setItem("h5AuthStatus", h5AuthStatus);
        localStorage.setItem("rewardId", rewardId);
      }
    }

  }
}
</script>

<style lang="less" scoped>
</style>
