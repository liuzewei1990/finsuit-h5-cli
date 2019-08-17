
import Toast from "@common/finsuit-components/Toast"
 export default (o = {}) => {
    let c = {
        duration: 1500,
        message: typeof o === 'string' ? o : o.message,
        position: "center",
        className: "",
        iconClass: ""
    };
    Toast({ ...c, ...o })
};