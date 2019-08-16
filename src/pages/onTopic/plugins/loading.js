import Vue from "vue"
import Loading from "@onTopic/components/Loading"
Vue.prototype.$Loading = (o = {}) => {
    let c = {
        message: typeof o === 'string' ? o : o.message,
        position: "middle",
        className: "",
    };
    return Loading({ ...c, ...o })
};

