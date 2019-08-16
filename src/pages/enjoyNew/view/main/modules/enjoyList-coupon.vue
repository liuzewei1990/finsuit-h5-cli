<template>
  <div class="enjoy-list-item">
    <div class="title ellipsis">
      <span>{{couponData.AMOUNT || "- -"}}元现金券</span>
    </div>
    <div class="desc ellipsis">首投满{{couponData.AMOUNT_REST}}元可得</div>
    <Button class="btn" type="primary" :showLoading="false" @click.native="$checkLogin({action:handleBtnClick})" v-track:ACB0L004.click.native="{fn:()=>{},id:couponData.ID}" :disabled="false">立即领取</Button>
  </div>
</template>

<script>
/**
 * 现金券子组件，被enjoy-list组件所引用
 */
import Button from "@enjoyNew/components/Button"
export default {
  components: { Button },
  props: ["couponData"],
  data () {
    return {

      // 按钮loading
      btnLoading: this.$Loading(),
    }
  },
  methods: {

    // btn点击
    handleBtnClick (item) {
      if (!this.couponData.ID) {
        this.$Toast("现金券id不存在");
        return;
      }
      this.getCoupon(this.couponData.ID);
    },

    /**
     * 领取现金券
     */
    async getCoupon (couponId) {
      try {
        let data = {};
        let params = { COUPON_ID: couponId };
        if (this.btnLoading.isShow) return;
        this.btnLoading.show();
        data = await this.$api.postEnjoyCoupon(params);
        console.debug("this.$api.postEnjoyCoupon", data);
        if (this.$utils.isObject(data)) {
          this.checkCouponStatus(data);
        } else {
          this.$Toast("this.$api.postEnjoyCoupon data error")
        }
        this.btnLoading.close();
      } catch (error) {
        console.error(error);
        this.btnLoading.close();
      }
    },

    // 领取现金券 --- 判断状态
    checkCouponStatus (data) {
      switch (String(data.STATUS)) {
        // 不是新用户
        case "4":
          this.$NotNewUserPublicDialog();
          break;
        // 已体验过新人福利
        case "5":
          this.$Toast("您已使用，可到我的钱包中查看");
          break;
        // 已领取过优惠券
        case "6":
          this.openCouponDialogEnd(data);
          break;
        // 领取成功
        case "7":
          this.openCouponDialogSuccess(data);
          break;
        // 其他
        default:
          this.$Toast("领取现金券-状态异常");
          break;
      }
    },

    // 领取现金券 --- 已领取过现金券弹窗
    async openCouponDialogEnd (data) {

      let DialogComponentEnd = this.$CommonDialog({
        type: "2",
        appendElement: this.$root.$el.querySelector("#page"),
        className: "",
        title: "您已领取新手专享现金券",
        desc: `首存满${data.AMOUNT_REST}元得${data.AMOUNT}元红包`,
        content: `${data.AMOUNT}元现金券`,
        btnTxt: "立即使用",
        btnDisabled: false,
        linkTxt: "",
        btnCallback: async () => {
          try {
            DialogComponentEnd.btnDisabled = DialogComponentEnd.btnLoading = true;
            let targetPrd = await this.$toTargetProducdDetailUrl();
            this.$trackEvents.ACB0L013("立即使用", targetPrd.ID);
            DialogComponentEnd.btnDisabled = DialogComponentEnd.btnLoading = false;
          } catch (error) {
            DialogComponentEnd.btnDisabled = DialogComponentEnd.btnLoading = false;
          }
        },
        linkCallback: () => { }
      });

      if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
        DialogComponentEnd.linkTxt = "您可在(我的钱包)-卡券中查看";
        DialogComponentEnd.linkCallback = () => {
          this.$bcBridge.toAppWalletPage();
          this.$trackEvents.ACB0L013("您可在(我的钱包)-卡券中查看");
        }
      } else {
        DialogComponentEnd.linkTxt = `前往${this.$Config.dowloadAppName}APP-卡券中查看`;
        DialogComponentEnd.linkCallback = () => {
          // DialogComponentEnd.close();
          this.$trackEvents.ACB0L013(`前往${this.$Config.dowloadAppName}APP-卡券中查看`);
          this.$dowloadAppHelp();
        }
      }
    },

    // 领取现金券 --- 领取成功弹窗
    openCouponDialogSuccess (data = {}) {
      let DialogComponentSuccess = this.$CommonDialog({
        type: "2",
        appendElement: this.$root.$el.querySelector("#page"),
        className: "",
        title: "恭喜获得新人专享现金券",
        desc: `首存满${data.AMOUNT_REST}元得${data.AMOUNT}元红包`,
        content: `${data.AMOUNT}元现金券`,
        btnTxt: "立即使用",
        btnDisabled: false,
        linkTxt: "",
        btnCallback: async () => {
          try {
            DialogComponentSuccess.btnDisabled = DialogComponentSuccess.btnLoading = true;
            let targetPrd = await this.$toTargetProducdDetailUrl();
            this.$trackEvents.ACB0L013("立即使用", targetPrd.ID);
            DialogComponentSuccess.btnDisabled = DialogComponentSuccess.btnLoading = false;
          } catch (error) {
            DialogComponentSuccess.btnDisabled = DialogComponentSuccess.btnLoading = false;
          }
        },
        linkCallback: () => { }
      });

      if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
        DialogComponentSuccess.linkTxt = "您可在(我的钱包)-卡券中查看";
        DialogComponentSuccess.linkCallback = () => {
          this.$bcBridge.toAppWalletPage();
          this.$trackEvents.ACB0L013("您可在(我的钱包)-卡券中查看");
        }
      } else {
        DialogComponentSuccess.linkTxt = `前往${this.$Config.dowloadAppName}APP-卡券中查看`;
        DialogComponentSuccess.linkCallback = () => {
          this.$trackEvents.ACB0L013(`前往${this.$Config.dowloadAppName}APP-卡券中查看`);
          this.$dowloadAppHelp();
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
</style>
