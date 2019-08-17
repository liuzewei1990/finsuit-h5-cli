
import { Base64 } from 'js-base64'


/**
 * 原型方法：登录和按钮拦截器
 */
export default {
    // 登录方法
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
                this.$downloadApp();
            }
        })
    },

    // 检查是否登录，未登录先登录，登录成功执行回调
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
    },

    // 检查是否登录，未登录先登录，登录成功不执行回调
    checkToLogin: function (target = {}) {
        const action = target.action;
        const data = target.data;
        if (sessionStorage.getItem("TOKEN") && this.$store.getters.isLogin) {
            action(data);
        } else {
            this.$login().then(() => {
                // action(data);
            });
        }
    }
}