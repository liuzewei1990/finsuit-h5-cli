
import { Base64 } from 'js-base64'


/**
 * 原型方法：登录和按钮拦截器
 */
export default {
    login: function () {
        return new Promise((resolve, reject) => {
            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.$bcBridge.goLogin();
                window.loginResult = (argument) => {
                    const userInfo = JSON.parse(Base64.decode(argument));
                    this.$store.commit("USER_LOGIN", userInfo);
                    resolve(userInfo);
                }
                window.loginCanceled = () => {
                    // this.$Toast("已取消");
                    reject();
                }
            } else if (this.$store.state.APP_FLAG === "PMP") {
                this.$Toast("请先登录");
            } else {
                this.$iosConfirm({
                    title: "提示",
                    text: "是否前往下载比财APP参与活动",
                    input: false,
                    placeholder: '',
                    cancelText: '稍后下载',
                    okText: '去下载',
                    remindDuration: 650,
                    appendChildClass: "",
                }).then((btn) => {
                    this.$trackEvents.ACB0G046();
                    setTimeout(() => {
                        window.location.href = this.$Config.appDownloadUrl;
                    }, 500);
                }).catch(() => { })
            }
        })
    },

    checkLogin: function (target = {}) {
        const action = target.action;
        const data = target.data;
        if (sessionStorage.getItem("TOKEN") && this.$store.getters.isLogin) {
            action(data);
        } else {
            this.$login().then(() => {
                action(data);
            });
        }
    }
}