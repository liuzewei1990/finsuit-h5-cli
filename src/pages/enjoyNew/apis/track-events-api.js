import http from '@enjoyNew/apis/http.js'
import config from '@enjoyNew/config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/

// 活动首页初始化页面
export const ACB0L001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L001", REMARK_DATA: "活动首页初始化页面", FROM_ID: config.actityID });

// 活动首页-活动规则
export const ACB0L002 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L002", REMARK_DATA: "活动首页-活动规则", FROM_ID: config.actityID });

// 活动首页-免费领取
export const ACB0L003 = (context, enjoyMoneyBtnStatus) => {
    let ITEM_VALUE = enjoyMoneyBtnStatus; // 用户体验金状态
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L003", REMARK_DATA: "活动首页-免费领取", ITEM_VALUE, FROM_ID: config.actityID });
}

// 活动首页-立即领取
export const ACB0L004 = (context, id = "") => {
    let ITEM_VALUE = id; // 福利id
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L004", REMARK_DATA: "活动首页-立即领取", ITEM_VALUE, FROM_ID: config.actityID });
}

// 活动首页-立即抢购
export const ACB0L005 = (context, args) => {
    let ITEM_VALUE = context.currClickItem.PRD_INDEX_ID; // 产品id
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L005", REMARK_DATA: "活动首页-立即抢购", ITEM_VALUE, FROM_ID: config.actityID });
}

// 体验金结果页-查看详情
export const ACB0L006 = (context, args) => {
    let ITEM_VALUE = context.currClickItem.PRD_INDEX_ID; // 产品id
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L006", REMARK_DATA: "体验金结果页-查看详情", ITEM_VALUE, FROM_ID: config.actityID });
}

// 体验金详情页-立即使用
export const ACB0L007 = (context, id = "") => {
    let ITEM_VALUE = id; // 体验金id
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L007", REMARK_DATA: "体验金详情页-立即使用", ITEM_VALUE, FROM_ID: config.actityID });
}


// 新手专享弹窗按钮
export const ACB0L013 = (btnTxt = "", id = "") => {
    let ITEM_VALUE = btnTxt; // 按钮文案
    let ITEM_VALUE1 = id; // 券id || 产品id || 文案链接
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0L013", REMARK_DATA: "新手专享弹窗按钮", ITEM_VALUE, ITEM_VALUE1, FROM_ID: config.actityID });
}


// 站外-下载比财APP
export const ACB0G046 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0G046", REMARK_DATA: "站外引导下载页-下载比财app领取", FROM_ID: config.actityID });