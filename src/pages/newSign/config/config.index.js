

/**
 * 项目配置文件
 */

const CONFIG = {

    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 签到活动code
        actityCode: "SINGINF",
        // api host
        // baseUrlHost: "http://192.168.100.203:8080",
        // baseUrlHost: "https://app-test3.bicai365.com",
        baseUrlHost: "https://finsuit.bicai365.com",
        mockUrlHost: "http://easy-mock.liuup.com/mock/5ca38ef1d360c27a130ae4d2/sign",
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // baseUrlPath: "/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 分享link配置
        shareTitle: "还有谁想从我们这拿走iPhone Xs",
        shareDesc: "玩签到，领礼品，福利天天有",
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 签到活动code
        actityCode: "SINGINF",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        baseUrlHost: "https://finsuit.bicai365.com",
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 分享link配置
        shareTitle: "还有谁想从我们这拿走iPhone Xs",
        shareDesc: "玩签到，领礼品，福利天天有",
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 签到活动code
        actityCode: "SINGINF",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
        // 分享link配置
        shareTitle: "还有谁想从我们这拿走iPhone Xs",
        shareDesc: "玩签到，领礼品，福利天天有",
    }
}

console.warn("当前配置文件所属环境变量：", process.env.NODE_ENV);
export default CONFIG[process.env.NODE_ENV];