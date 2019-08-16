/**
 * 点击新手专享产品购买时，领取现金券，公共逻辑
 */

export default {


    methods: {

        // 检查用户状态
        checkUserStatus (data) {
            switch (String(data.STATUS)) {
                // 不是新人
                case "4":
                    this.$toEnjoyProducdDetailUrl(this.currClickItem.ID);
                    // this.$NotNewUserPublicDialog(this.currClickItem.ID);
                    break;
                // 已体验新手福利
                case "5":
                    this.$toEnjoyProducdDetailUrl(this.currClickItem.ID);
                    break;
                // 已领优惠券
                case "6":
                    this.$toEnjoyProducdDetailUrl(this.currClickItem.ID);
                    break;
                // 未领取优惠券
                case "8":
                    this.openCouponDialogAwait(data);
                    break;

                default:
                    this.$Toast("立即购买-状态异常");
                    break;
            }
        },

        // 未领取现金券
        openCouponDialogAwait (data = {}) {
            let DialogComponentAwait = this.$CommonDialog({
                type: "2",
                appendElement: this.$root.$el.querySelector("#page"),
                className: "",
                title: "您未领取新手专享现金券",
                desc: "抢购不享受满返福利",
                content: `${data.AMOUNT}元现金券`,
                btnTxt: "领取现金券",
                btnDisabled: false,
                btnLoading: false,
                linkTxt: "立即抢购",
                btnCallback: () => {
                    this.getCoupon(data.COUPON_ID, DialogComponentAwait);
                    this.$trackEvents.ACB0L013("领取现金券", data.COUPON_ID);
                },

                linkCallback: () => {
                    DialogComponentAwait.close();
                    this.$toEnjoyProducdDetailUrl(this.currClickItem.ID);
                    this.$trackEvents.ACB0L013("立即抢购", this.currClickItem.ID);
                }
            });
        },

        /**
         * 领取现金券
         */
        async getCoupon (couponId, DialogComponentAwait) {
            if (!couponId) {
                this.$Toast("现金券ID不存在");
                return;
            }
            try {
                let data = {};
                let params = { COUPON_ID: couponId };
                DialogComponentAwait.btnLoading = DialogComponentAwait.btnDisabled = true;
                data = await this.$api.postEnjoyCoupon(params);
                console.debug("this.$api.postEnjoyCoupon", data);
                if (this.$utils.isObject(data)) {
                    this.checkCouponStatus(data);
                } else {
                    this.$Toast("this.$api.postEnjoyCoupon data error")
                }
                DialogComponentAwait.btnLoading = DialogComponentAwait.btnDisabled = false;
            } catch (error) {
                console.error(error);
                DialogComponentAwait.btnLoading = DialogComponentAwait.btnDisabled = false;
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
                    this.openCouponDialogTip(data);
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

        // 领取现金券 --- 已体验过新人福利 产品没有考虑该情况，自行添加该逻辑
        async openCouponDialogTip (data) {
            let DialogComponentTip = this.$CommonDialog({
                type: "2",
                appendElement: this.$root.$el.querySelector("#page"),
                className: "",
                title: "您已使用新手专享现金券",
                desc: "抢购不享受满返福利",
                content: `${data.AMOUNT}元现金券`,
                btnTxt: "立即抢购",
                btnDisabled: false,
                linkTxt: "",
                btnCallback: () => {
                    DialogComponentTip.close();
                    this.$toEnjoyProducdDetailUrl(this.currClickItem.ID);
                    this.$trackEvents.ACB0L013("立即抢购", this.currClickItem.ID);
                },
                linkCallback: () => { }
            });
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
                btnCallback: () => {
                    DialogComponentEnd.close();
                    this.$toEnjoyProducdDetailUrl(this.currClickItem.ID);
                    this.$trackEvents.ACB0L013("立即使用", this.currClickItem.ID);
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
                btnCallback: () => {
                    DialogComponentSuccess.close();
                    this.$toEnjoyProducdDetailUrl(this.currClickItem.ID);
                    this.$trackEvents.ACB0L013("立即使用", this.currClickItem.ID);
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
        }
    }
}