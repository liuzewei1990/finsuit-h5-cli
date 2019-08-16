
export default {
    install: Vue => {
        // xxxx-xx-xx xx:xx:xx 转 xxxx-xx-xx
        Vue.filter("toDate", (v) => {
            if (!v) return "- -";
            v += "";
            return v.slice(0, 10);
        })
    }
}
