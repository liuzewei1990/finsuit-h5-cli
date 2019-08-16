
/**
 * 原型方法：跳转到新手专享产品包装页
 */

export default function (producdId) {
    if (!producdId) {
        this.$Toast("未配置产品或产品id不存在");
        return;
    }
    const host = this.$Config.producdDetailHost;
    let url = "";
    // 拼财app
    if (this.$store.state.APP_FLAG == "PC") {
        // url = (host + `/pc/#/personal?type=alone&id=${producdId}&__with_login__=1&hideRightShare=`);
        url = host + `/pc/#/personal`;
        url += `?type=alone`;
        url += `&id=${producdId}`;
        url += `&hideH5Share=true`;
        url += `&actityCode=${this.$Config.actityCode}`;
        url += `&__with_login__=1&hideRightShare=`;
        console.log("跳转拼财app", url);
        this.$bcBridge.openWebview(url);
        return;
    }
    // 比财app
    if (this.$store.state.APP_FLAG == "BC") {
        // url = (host + `/nay/#/personal?type=alone&id=${producdId}&__with_login__=1&hideRightShare=`);
        url = host + `/nay/#/personal`;
        url += `?type=alone`;
        url += `&id=${producdId}`;
        url += `&hideH5Share=true`;
        url += `&actityCode=${this.$Config.actityCode}`;
        url += `&__with_login__=1&hideRightShare=`;
        console.log("跳转比财app", url);
        this.$bcBridge.openWebview(url);
        return;
    }
    // 小程序环境
    if (this.$store.state.APP_FLAG == "PMP") {
        url = host + `/mp/#/personal`
        url += `?type=alone`;
        url += `&id=${producdId}`;

        url += `&hideH5Share=true`;
        url += `&actityCode=${this.$Config.actityCode}`;

        url += `&TOKEN=${this.$store.state.TOKEN}`;
        url += `&PMP_FLAG=1`;
        url += `&MEMBER_ID=${this.$store.state.ID}`;
        url += `&SYSTEM_TYPE=${this.$store.state.SYSTEM_TYPE}`;
        url += `&MODEL=${this.$store.state.MODEL}`;
        url += `&OPEN_API_CHANNEL_ID=${this.$store.state.OPEN_API_CHANNEL_ID}`;
        setTimeout(() => {
            window.location.href = url;
        }, 500);
        return;
    } else {
        url = (host + `/mp/#/personal?type=alone&id=${producdId}&TOKEN=${this.$store.state.TOKEN}`);
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
}