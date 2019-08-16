

/**
 * 项目配置文件
 */

const CONFIG = {
    v: "1.1.0(build Time 2019-08-15 10:02)",
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 签到活动code
        actityCode: "ACTIVITY_NOVICE",
        // 活动id 打点需要
        actityID: "1007",
        // api host 
        baseUrlHost: "https://finsuit.bicai365.com",
        // baseUrlHost: "http://192.168.5.171:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5ca38ef1d360c27a130ae4d2/enjoyNew",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 分享link配置
        shareTitle: "",
        shareDesc: "",
        shareLink: "",
        shareImgurl: "",
        appDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage",
        // 包装页服务器地址
        producdDetailHost: "https://adv3.bicai365.com",
        // 实名认证业务域名
        realNameAuthHost: "https://adv.bicai365.com",
        // H5host
        h5Host: "http://192.168.137.1:7789",
        // H5 server path
        h5ServerPath: "",
        // 页面中涉及到要推广app文案名称配置
        dowloadAppName: "拼财",
        // 拼财线上版本 - 兼容用到
        PC_V: "1.0.8"
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 签到活动code
        actityCode: "ACTIVITY_NOVICE",
        // 活动id 打点需要
        actityID: "1007",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        baseUrlHost: "https://finsuit.bicai365.com",
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 分享link配置
        shareTitle: "",
        shareDesc: "",
        shareLink: "",
        shareImgurl: "",
        appDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage",
        // 包装页服务器地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
        // 实名认证业务域名
        realNameAuthHost: (window.location.protocol + '//' + window.location.host),
        // H5host
        h5Host: (window.location.protocol + '//' + window.location.host),
        // H5 server path
        h5ServerPath: "/nps",
        // 页面中涉及到要推广app文案名称配置
        dowloadAppName: "拼财",
        // 拼财线上版本 - 兼容用到
        PC_V: "1.0.8"
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 签到活动code
        actityCode: "ACTIVITY_NOVICE",
        // 活动id 打点需要
        actityID: "1005",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
        // 分享link配置 
        shareTitle: "",
        shareDesc: "",
        shareLink: "",
        shareImgurl: "",
        appDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage",
        // 包装页服务器地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
        // 实名认证业务域名
        realNameAuthHost: (window.location.protocol + '//' + window.location.host),
        // H5host
        h5Host: (window.location.protocol + '//' + window.location.host),
        // H5 server path
        h5ServerPath: "/nps",
        // 页面中涉及到要推广app文案名称配置
        dowloadAppName: "拼财",
        // 拼财线上版本 - 兼容用到
        PC_V: "1.0.8"
    }
}
console.warn("当前H5版本:", CONFIG.v);
console.warn("当前环境变量：", process.env.NODE_ENV);
export default CONFIG[process.env.NODE_ENV];