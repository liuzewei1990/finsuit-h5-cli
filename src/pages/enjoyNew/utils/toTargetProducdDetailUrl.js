/**
 * 原型方法:获取新手专享产品列表，跳转到指定的产品包装页,这里默认选择第一条数据，后台会根据运营配置的产品处理排序。
 */

export default async function () {
    try {
        let params = {};
        let targetPrd = {};
        let data = await this.$api.getEnjoyProducds(params);
        console.debug("this.$api.getEnjoyProducds", data);
        if (this.$utils.isObject(data)) {
            targetPrd = this.$utils.isArray(data.DATA_LIST) && (data.DATA_LIST[0] || {});
            this.$toEnjoyProducdDetailUrl(targetPrd.ID);
            return targetPrd;
        } else {
            this.$Toast("this.$api.getEnjoyProducds data error");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}