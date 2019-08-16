/**
 * 原型方法：公共弹窗（不是新用户）
 */
export default async function (producdId) {
    let isProducdId = !!producdId;

    let DialogComponent = this.$CommonDialog({
        type: "1",
        appendElement: this.$root.$el.querySelector("#page"),
        className: "",
        title: "您不是新用户哦",
        desc: "不能领取此福利",
        content: require("@enjoyNew/assets/images/d-c-1.png"),
        btnTxt: "立即抢购",
        btnDisabled: false,
        btnLoading: false,
        linkTxt: "",
        btnCallback: async () => {
            if (isProducdId) {
                this.$toEnjoyProducdDetailUrl(producdId);
                this.$trackEvents.ACB0L013("立即抢购", producdId);
                return;
            }
            try {
                DialogComponent.btnDisabled = DialogComponent.btnLoading = true;
                let targetPrd = await this.$toTargetProducdDetailUrl();
                DialogComponent.btnDisabled = DialogComponent.btnLoading = false;
            } catch (error) {
                DialogComponent.btnDisabled = DialogComponent.btnLoading = false;
            }

            this.$trackEvents.ACB0L013("立即抢购", targetPrd.ID);
        },
        linkCallback: () => {

        }
    });

    // 加载弹窗底部link配置数据
    let params = { TYPE: "B" };
    let data = await this.$api.getDialogData(params);
    let url = "";
    console.debug("this.$api.getDialogData", data);

    if (!this.$utils.isObject(data)) {
        this.$Toast("this.$api.getDialogData data error");
        return;
    }

    // 不配置不显示link
    if (!(data.LINK && data.TEXT)) return;
    if ((data.LINK + "").indexOf("http") === 0) {
        url = data.LINK;
    } else {
        url = (window.location.protocol + '//' + window.location.host) + data.LINK;
    }

    DialogComponent.linkTxt = data.TEXT;
    // 点击回调
    DialogComponent.linkCallback = () => {
        this.$trackEvents.ACB0L013(DialogComponent.linkTxt);

        if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
            this.$bcBridge.openWebview(url);
        } else {
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        }
    };
}