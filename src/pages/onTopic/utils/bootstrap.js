
/**
 * vue实例挂载方法
 */

import { Base64 } from "js-base64"

export default function () {

    let query = this.$utils.getQueryStr();

    /**
     * 活动ID必带参数 获取全局活动ID 储存起来, 注意顺序，先取query在取store,以便更新。
     */
    let actityId = query.ACTITY_ID || this.$store.state.ACTITY_ID;
    if (actityId) this.$store.commit("ACTITY_ID", { ACTITY_ID: actityId });
    else this.$Toast("未配置活动ID")



    /**
     * app环境挂载实例 ---- 获取用户信息储存到store以及sess中 同步挂载vue根实例。保证vue组件的生命周期与用户信息耦合起来。
     */
    if (this.$bcBridge.APP_FLAG === "PC" || this.$bcBridge.APP_FLAG === "BC") {
        window.loginResult = window.unloginResult = (argument) => {
            const userInfo = JSON.parse(Base64.decode(argument));
            this.$store.commit("USER_LOGIN", userInfo);
            this.$mount('#app');
        }
        return;
    }


    /**
     * 站外环境 以及小程序环境挂载实例 ---- 获取用户信息储存到store以及sess中 同步挂载vue根实例。保证vue组件的生命周期与用户信息耦合起来。
     */
    //  如果url中带有用户信息
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
    // 如果url中有分享落地页附加来源APP_FLAG渠道参数
    else if (query.FROM_APP_FLAG) {
        let params = {
            FROM_APP_FLAG: query.FROM_APP_FLAG,
        }
        this.$store.commit("FROM_APP_FLAG", params);
    }

    this.$mount('#app');
}