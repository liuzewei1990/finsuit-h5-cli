
/**
 * 原型方法：跳转到产品详情页面
 */

export default async function (producdId) {
    if (!producdId) {
        this.$Toast("产品ID不能为空");
        return;
    }

    try {
        let params = { PRD_ID: producdId }
        let data = await this.$api.getProducdDetailUrl(params);
        console.log("this.$api.getProducdDetailUrl-----------", data);
        if (this.$utils.isObject(data)) {

            // 活动已经下架
            if (data.is_enabled == "1") {
                this.$Toast(data.msg);
                return;
            }

            // 上架的活动 H5跳转
            if (data.is_enabled == "0" && data.redirect == "1") {
                if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                    this.$bcBridge.openWebview(data.url);
                } else {
                    setTimeout(() => {
                        window.location.href = data.url;
                    }, 500);
                }
            }

            // 上架的活动 原生跳转
            if (data.is_enabled == "0" && data.redirect == "2") {
                let params = { LINK_TO: "PRD_DETAIL", PRD_TYPE: "1", PRD_ID: producdId };
                this.$bcBridge.toAppPage(params);
            }

        } else {
            this.$Toast("this.$api.getProducdDetailUrl data error")
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}