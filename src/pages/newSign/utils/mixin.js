import store from "../store/index";
// import wxShare from "./wxShare.js";
import api from "./../fetch/api";
import html2canvas from "html2canvas";
// 处理query

function queryInit (url, routeQuiery) {
    if (url.indexOf("?") == -1) return {};
    let url_arr = url.split("?");
    let returnQuery = {};
    if (url_arr.length == 2) {
        returnQuery = routeQuiery;
    } else {
        let url_query_string = url_arr[url_arr.length - 1];
        let url_query_arr = url_query_string.split("&");
        let query = {};
        for (let i = 0; i < url_query_arr.length; i++) {
            let list = url_query_arr[i].split("=");
            if (list[1] === undefined || list[1] === null) {
                list[1] = "";
            }
            query[list[0]] = list[1];
        }
        returnQuery = query;
    }
    // 矫正 showTitle/lotteryId
    if (!returnQuery.showTitle) {
        returnQuery.showTitle = 1;
    } else {
        returnQuery.showTitle = Number(returnQuery.showTitle);
    }
    // 矫正设备ID
    if (
        returnQuery.DEVICE_ID == "" ||
        returnQuery.DEVICE_ID == "null" ||
        !returnQuery.DEVICE_ID
    ) {
        returnQuery.DEVICE_ID = "";
    } else {
        store.dispatch("STORE_DEVICE_ID", returnQuery.DEVICE_ID);
    }
    //矫正资讯详情的设备ID
    if (
        returnQuery.deviceId == "" ||
        returnQuery.deviceId == "null" ||
        !returnQuery.deviceId
    ) {
        returnQuery.deviceId = "";
    } else {
        store.dispatch("STORE_DEVICE_ID", returnQuery.deviceId);
    }
    if (returnQuery.DEVICE_ID) {
        sessionStorage.setItem("DEVICE_ID", returnQuery.DEVICE_ID);
    } else if (returnQuery.deviceId) {
        sessionStorage.setItem("DEVICE_ID", returnQuery.deviceId);
    } else {
        sessionStorage.setItem("DEVICE_ID", returnQuery.DEVICE_ID);
    }

    // 矫正showDown
    if (
        returnQuery.showDown == "" ||
        returnQuery.showDown == "null" ||
        !returnQuery.showDown
    ) {
        returnQuery.showDown = 0;
    } else {
        returnQuery.showDown = Number(returnQuery.showDown);
    }
    //矫正MEMBER_ID
    if (returnQuery.ID == "" || returnQuery.ID == "null" || !returnQuery.ID) {
        returnQuery.ID = "";
    } else {
        store.dispatch("MEMBER_ID", returnQuery.ID);
    }
    // 矫正session
    if (
        returnQuery.SESSION_ID == "" ||
        returnQuery.SESSION_ID == "null" ||
        !returnQuery.SESSION_ID
    ) {
        returnQuery.SESSION_ID = "";
    } else {
        store.dispatch("SESSION_ID", returnQuery.SESSION_ID);
    }
    // 矫正token并判断登录状态
    if (
        returnQuery.TOKEN == "" ||
        returnQuery.TOKEN == "null" ||
        !returnQuery.TOKEN
    ) {
        returnQuery.TOKEN = "";
    } else {
        store.dispatch("storeToken", returnQuery.TOKEN);
    }
    // 矫正isLogined
    if (!returnQuery.isLogined) {
        returnQuery.isLogined = 0;
    } else if (returnQuery.isLogined == "0" || returnQuery.isLogined == "1") {
        returnQuery.isLogined = Number(returnQuery.isLogined);
    } else {
        returnQuery.isLogined = 0;
    }
    if (!returnQuery.SOURCE) {
        returnQuery.SOURCE = "OTHER";
    }
    //矫正VERSION
    if (
        returnQuery.VERSION == "" ||
        returnQuery.VERSION == "null" ||
        !returnQuery.VERSION
    ) {
        returnQuery.VERSION = "";
    } else {
        store.dispatch("VERSION", returnQuery.VERSION);
    }
    // 矫正附加域
    if (
        returnQuery.FROM_TYPE == "" ||
        returnQuery.FROM_TYPE == null ||
        !returnQuery.FROM_TYPE
    ) {
        returnQuery.FROM_TYPE = "";
    }
    if (
        returnQuery.FROM_ID == "" ||
        returnQuery.FROM_ID == null ||
        !returnQuery.FROM_ID
    ) {
        returnQuery.FROM_ID = "";
    }
    // 矫正公共域
    if (
        returnQuery.APP_PLACE == "" ||
        returnQuery.APP_PLACE == "null" ||
        !returnQuery.APP_PLACE
    ) {
        returnQuery.APP_PLACE = "";
    }
    // 纠正 IOS 中的 审核标识：CHK_STATUS 0：审核中  1：审核完成；版本号  VERSION （格式 2.1.0）
    if (
        returnQuery.CHK_STATUS == "" ||
        returnQuery.CHK_STATUS == "null" ||
        !returnQuery.CHK_STATUS
    ) {
        returnQuery.CHK_STATUS = "";
    }
    if (
        returnQuery.VERSION == "" ||
        returnQuery.VERSION == "null" ||
        !returnQuery.VERSION
    ) {
        returnQuery.VERSION = "";
    }
    // 判断是否 sessionStorage 存储了 isLogined 和 TOKEN
    // let BC_doubleTwelve_queryUrl = JSON.parse(sessionStorage.getItem('BC_doubleTwelve_queryUrl'));
    // if (BC_doubleTwelve_queryUrl != null && BC_doubleTwelve_queryUrl.TOKEN != null) {
    // 	return BC_doubleTwelve_queryUrl;
    // }
    // 保存状态 到本地存储
    sessionStorage.setItem(
        "BC_doubleTwelve_queryUrl",
        JSON.stringify(returnQuery)
    );
    return returnQuery;
}

// 保留两位小数
function numberFix2 (input) {
    if (Number(input) === 0) {
        return "0.00";
    }
    if (input == "--") {
        return input;
    }
    let inputStr = input + "";
    let point = inputStr.indexOf(".");
    let result = "";

    if (point == -1) {
        result = Number(inputStr).toFixed(2);
    } else {
        let decimal = inputStr.split(".")[1];
        if (decimal.length >= 2) {
            result = inputStr.split(".")[0] + "." + decimal.substring(0, 2);
        } else {
            result = Number(inputStr).toFixed(2);
        }
    }
    return result;
}

// 保留四位小数
function numberFix4 (input) {
    if (Number(input) === 0) {
        return "0.0000";
    }
    if (input == "--") {
        return input;
    }
    let inputStr = input + "";
    let point = inputStr.indexOf(".");
    let result = "";

    if (point == -1) {
        result = Number(inputStr).toFixed(4);
    } else {
        let decimal = inputStr.split(".")[1];
        if (decimal.length >= 4) {
            result = inputStr.split(".")[0] + "." + decimal.substring(0, 4);
        } else {
            result = Number(inputStr).toFixed(4);
        }
    }
    return result;
}

// 数字转金额 三位加 ，
function Num2money (s) {
    if (s == "--") {
        return s;
    }
    // 判断数字是正数还是负数
    let minus = false;
    // 数字转字符串
    s = s + "";
    if (s.substring(0, 1) == "-") {
        minus = true;
        s = parseFloat(s.substring(1).replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    } else {
        s = parseFloat(s.replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    }
    let l = s
        .split(".")[0]
        .split("")
        .reverse(),
        r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    if (minus) {
        return (
            "-" +
            t
                .split("")
                .reverse()
                .join("")
            // "." +
            // r
        );
    } else {
        return (
            t
                .split("")
                .reverse()
                .join("")
            // "." +
            // r
        );
    }
}
// 数字转金额 三位加 ，
function Num2moneys (s) {
    if (s == "--") {
        return s;
    }
    // 判断数字是正数还是负数
    let minus = false;
    // 数字转字符串
    s = s + "";
    if (s.substring(0, 1) == "-") {
        minus = true;
        s = parseFloat(s.substring(1).replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    } else {
        s = parseFloat(s.replace(/[^\d\.-]/g, "")).toFixed(2) + "";
    }
    let l = s
        .split(".")[0]
        .split("")
        .reverse(),
        r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
    if (minus) {
        return (
            "-" +
            t
                .split("")
                .reverse()
                .join("") +
            "." +
            r
        );
    } else {
        return (
            t
                .split("")
                .reverse()
                .join("") +
            "." +
            r
        );
    }
}
// 信用卡活动初始化 查询参数
function urlQuery () {
    let url = window.location.href;
    let url_arr = url.split("?");
    let query = {};
    let url_query_string = url_arr[url_arr.length - 1];
    let url_query_arr = url_query_string.split("&");
    for (let i = 0; i < url_query_arr.length; i++) {
        let list = url_query_arr[i].split("=");
        query[list[0]] = list[1];
    }
    // 矫正 showTitle
    if (!query.showTitle) {
        query.showTitle = 1;
    }
    // 矫正设备ID
    if (query.DEVICE_ID == "" || query.DEVICE_ID == "null" || !query.DEVICE_ID) {
        query.DEVICE_ID = "";
    }
    // 存储设备ID
    store.dispatch("STORE_DEVICE_ID", query.DEVICE_ID);
    // 矫正session
    if (
        query.SESSION_ID == "" ||
        query.SESSION_ID == "null" ||
        !query.SESSION_ID
    ) {
        query.SESSION_ID = "";
    }
    store.dispatch("SESSION_ID", query.SESSION_ID);
    // 矫正token并判断登录状态
    if (query.TOKEN == "" || query.TOKEN == "null" || !query.TOKEN) {
        query.TOKEN = "";
    }
    store.dispatch("storeToken", query.TOKEN);

    return query;
}

// 双十二页面分享
function doubleTwelveShare () {
    api
        .commonApi(
            "/finsuitPhone/deal",
            'param_key={"head":{"TYPE":"GET_SHARE_DATA","SESSION_ID":"' +
            store.getters.sessionId +
            '","TOKEN":"' +
            store.getters.token +
            '","DEVICE_ID":"' +
            store.getters.DEVICE_ID +
            '"},"param":{"ID":"3"}}'
        )
        .then(res => {
            let data = res.data;
            store.dispatch("WX_SHARE_MSG", {
                share_title: data.title,
                share_description: data.description
            });
            wxShare.wxInit();
        });
}

// 分享给好友页面的微信二次分享 （安卓审核、正常版；苹果审核、正常版）
function shareAPP_WX_share () {
    document.title = "比财";
    // 分享的标题和描述存入vuex
    store.dispatch("WX_SHARE_MSG", {
        share_title: "比财-直销银行理财收益比价平台",
        share_description: "创新的直销银行理财收益比价平台，比较收益、一键购买。"
    });
    wxShare.wxInit();
}

//浏览器类型以及版本
function userAgentFn () {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re = /(msie|firefox|chrome|opera|version|safari).*?([\d.]+)/;
    var m = ua.match(re);
    if (!m) {
        return "其他浏览器";
    }
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    return Sys;
}

//去掉JSON.stringify转字符串去掉花括号
function removeBlock (str) {
    if (str) {
        var reg = /^\{/gi;
        var reg2 = /\}$/gi;
        str = str.replace(reg, "");
        str = str.replace(reg2, "");
        return str;
    } else {
        return str;
    }
}

// let MEMBER_ID=sessionStorage.getItem('MEMBER_ID')||''
// let FROM_ID=sessionStorage.getItem('ACTIVITY_ID')//'21'//'78'


//打点
function pointFn (params, cb, cbParam) {
    // alert(sessionStorage.getItem("DEVICE_ID"))

    let CHANNEL_CODE = sessionStorage.getItem('CHANNEL_CODE')
    var ua = navigator.userAgent;
    //1是APP内
    var Appid;
    if (ua.indexOf("besharp") != -1) {
        Appid = 'BC'
    } else if (ua.indexOf("pincai") != -1) {
        Appid = 'PC'
    } else {
        Appid = 'OUTLINK'
    }


    let createTime = new Date().getTime();
    let sourceUrl = encodeURIComponent(window.location.href);
    let Sys = userAgentFn();
    var browser, ver, str;
    if ((typeof Sys).toLowerCase() == "string") {
        browser = ver = Sys;
    } else {
        browser = Sys.browser;
        ver = Sys.ver;
    }
    str = JSON.stringify(params);
    str = removeBlock(str);
    api.commonApi(
        "/finsuitPhone/deal",
        'param_key={"head":{"TYPE":"BATCH_RECORD_FUNCTION_LOG_INFO","VERSION":"' +
        sessionStorage.getItem("VERSION") +
        '","SESSION_ID":"' +
        sessionStorage.getItem("WORLDCUPSESSION") +
        '","TOKEN":"' +
        sessionStorage.getItem("WORLDCUPTOKEN") +
        '","DEVICE_ID":"' +
        sessionStorage.getItem("DEVICE_ID") +
        '"},"param":{"FUNCTION_LOG_LIST":[{"APP_PLACE": "' +
        99 +
        '","FROM_TYPE":"10","NETWORK_TYPE":"2","SOURCE_ID":"2","CREATE_TIME":"' +
        createTime +
        '","SOURCE_URL":"' +
        sourceUrl +
        '","FROM_ID":"' +
        sessionStorage.getItem('ACTIVITY_ID') +
        // FROM_ID+
        '","MEMBER_ID":"' +
        sessionStorage.getItem('MEMBER_ID') +
        '","ITEM_VALUE1":"' +
        browser +
        '","ITEM_VALUE2":"' +
        ver +
        '","CORP_CHANNEL_ID":"' +
        CHANNEL_CODE +
        '","FROM_PR1":"' +
        Appid +
        '",' +
        str +
        "}]}}"
    )
        .then(res => {
            // console.log("成功", res);
            cb && cb(cbParam);
        })
        .catch(err => {
            console.log("失败", err);
            cb && cb(cbParam);
        });
}

function goPAGE () {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        /*window.location.href="你的手机版地址";*/
        return "mobile";
    }
    else {
        /*window.location.href="你的电脑版地址";    */
        return "pc";
    }
}
function screenshots (id, cb) {
    let that = this;
    var shareContent = document.getElementById(id);
    var canvas = document.createElement("canvas");
    var scale = 2;
    canvas.width = 100 * scale;
    canvas.height = 100 * scale;
    canvas.getContext("2d").scale(scale, scale);
    var opts = {
        scale: scale,
        canvas: canvas,
        useCORS: true
    };
    setTimeout(() => {
        html2canvas(document.getElementById(id), opts).then(function (canvas) {
            var context = canvas.getContext("2d");
            var testImg = canvas.toDataURL("image/jpeg", 1);
            console.log(testImg)
            cb && cb(testImg);
        });
    }, 200);

    // 缩略图
    var canvasd = document.createElement("canvas");
    canvasd.width = 10;
    canvasd.height = 10;
    var optd = {
        scale: 1,
        canvas: canvasd,
        useCORS: true
    };
    setTimeout(() => {
        html2canvas(document.getElementById(id), optd).then(function (canvas) {
            var context = canvas.getContext("2d");
            var baseImg2 = canvas.toDataURL("image/jpeg", 0.01);
        });
    }, 200);

}
function whatClient () {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid ? "isAndroid" : "isIOS";
}
export default {
    urlQuery,
    queryInit,
    numberFix2,
    numberFix4,
    Num2money,
    Num2moneys,
    // doubleTwelveShare,
    // shareAPP_WX_share,
    pointFn,
    userAgentFn,
    goPAGE,
    screenshots,
    whatClient
};
