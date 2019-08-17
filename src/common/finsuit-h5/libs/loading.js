
import Loading from "@common/finsuit-components/Loading"
 export default (o = {}) => {
    let c = {
        message: typeof o === 'string' ? o : o.message,
        position: "middle",
        className: "",
    };
    return Loading({ ...c, ...o })
};

