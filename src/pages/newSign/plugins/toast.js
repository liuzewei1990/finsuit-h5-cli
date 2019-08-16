import Vue from "vue"
import Toast from "@newSign/components/common/Toast"
Vue.prototype.$Toast = (o = {}) => {
    let c = {
        duration: 3000,
        message: typeof o === 'string' ? o : o.message,
        position: "center",
        className: "",
        iconClass: ""
    };
    Toast({ ...c, ...o })
};