
/**
 * 原型方法：跳转到H5实名认证页面，认证成功回调指定地址
 */

export default function (targetHref = "") {

    let toRealName = {
        head: {
            channelId: "12",                                        // 必传。渠道id 外部传人。数字 -- 小程序固定为12
            userChannel: this.$store.state.OPEN_API_CHANNEL_ID,     // 登录状态下必传。用户注册渠道 。小程序登录要传。登录时的OPEN_API_CHANNEL_ID
            appFlag: this.$store.state.APP_FLAG,                    //  必传。BC / PC / PMP  必传 不传默认BC
            channel: "",                                            // 不知道是啥，h5传空
            clientId: "30",                                         // 不知道是啥。传30。
            deviceId: "",                                           // 设备号。 获取不到可不传。
            deviceName: "",                                         // 设备名称。获取不到可不传。
            systemType: this.$store.state.SYSTEM_TYPE,              // 系统。'h5' 浏览器内获取不到，传h5
            token: this.$store.state.TOKEN,                         // 登录时必传
            version: this.$store.state.VERSION,                     // 版本号，获取不到可不传。
            channelType: "2"                                        // h5传2
        },
        common: {},                                                  // 占位不用填写
        type: "realName",
        params: {
            targetHref: targetHref
        }
    };
    // 统一通过url问号拼接传参数。
    //传参数前将参数先进行JSON.stringify，然后进行encodeURIComponent
    console.debug("实名toRealName data", toRealName);
    toRealName = encodeURIComponent(JSON.stringify(toRealName));
    let url = `${this.$Config.realNameAuthHost}/h5openapibanks/000/realName.html#/openFirst?toRealName=1&data=${toRealName}&close=worldCupActive&__with_login__=1&hideRightShare=`;
    // url = `http://192.168.137.1:7790/#/test1?url=${encodeURIComponent(targetHref)}&close=worldCupActive&__with_login__=1&hideRightShare=`; 测试用的
    if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.openWebview(url);
    } else {
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
}