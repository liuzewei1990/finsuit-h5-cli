
/**
 * vue实例挂载方法
 */

import { Base64 } from "js-base64"

export default function () {

    // app环境
    if (this.$bcBridge.APP_FLAG === "PC" || this.$bcBridge.APP_FLAG === "BC") {
        window.loginResult = window.unloginResult = (argument) => {
            const userInfo = JSON.parse(Base64.decode(argument));
            this.$store.commit("USER_LOGIN", userInfo);
            this.$mount('#app');
        }
    }

    // 非app环境
    else {
        let query = this.$utils.getQueryStr();
        // 地址参数用户信息, 判断是避免重复 commit store 数据丢失问题
        if (query.PMP_FLAG) {
            let userInfo = {
                ID: query.MEMBER_ID,
                PHONE_NUM: query.PHONE_NUM,
                TOKEN: query.TOKEN,
                SESSION_ID: query.SESSION_ID,
                DEVICE_ID: query.DEVICE_ID,
                SYSTEM_TYPE: query.SYSTEM_TYPE,
                VERSION: query.VERSION,
                CHANNEL_ID: query.CHANNEL_ID,
                APP_FLAG: query.PMP_FLAG == "1" ? "PMP" : query.PMP_FLAG,
                CHANNEL: query.CHANNEL,
                CT_VER: query.CT_VER,
                MODEL: query.MODEL,
                OPEN_API_CHANNEL_ID: query.OPEN_API_CHANNEL_ID
            }
            this.$store.commit("USER_LOGIN", userInfo);
        }

        // 站外地址附加参数信息
        if (query.FROM_APP_FLAG) {
            let params = {
                FROM_APP_FLAG: query.FROM_APP_FLAG || "BC",
            }
            this.$store.commit("FROM_APP_FLAG", params);
        }

        this.$mount('#app');
    }
}