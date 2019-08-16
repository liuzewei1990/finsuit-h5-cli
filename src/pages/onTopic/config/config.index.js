

/**
 * 项目配置文件
 */

const CONFIG = {
    v: "1.1.0(build Time 2019-08-13 17:18)",
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ANSWER_ACTIVITY",
        // api host
        baseUrlHost: "https://adv2.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5d352de7d360c27a130ae973/oneTopic",
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
        appDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage"
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ANSWER_ACTIVITY",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        baseUrlHost: "https://adv2.bicai365.com",
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 分享link配置
        shareTitle: "",
        shareDesc: "",
        shareLink: "",
        shareImgurl: "",
        appDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage"
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ANSWER_ACTIVITY",
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
        appDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage"
    }
}
console.warn("当前H5版本:", CONFIG.v);
console.warn("当前环境变量：", process.env.NODE_ENV);
export default CONFIG[process.env.NODE_ENV];