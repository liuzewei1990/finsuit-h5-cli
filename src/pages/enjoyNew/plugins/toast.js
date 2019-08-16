import Vue from "vue"
import Toast from "@enjoyNew/components/Toast"
Vue.prototype.$Toast = (o = {}) => {
    let c = {
        duration: 1500,
        message: typeof o === 'string' ? o : o.message,
        position: "center",
        className: "",
        iconClass: ""
    };
    Toast({ ...c, ...o })
};