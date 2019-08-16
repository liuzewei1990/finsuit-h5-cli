import http from '@newSign/apis/http.js'
import config from '@newSign/config/config.index.js'


/**
* @name B000A122 埋点唯一标识ID（自定义）
* @param {Object} context 当前上下文
* @param {Object} args 动态参数
*/
// 签到提醒开关
export const B000A122 = (context, args) => {
    let ITEM_VALUE = context.switchs ? "1" : "0"; // 是否开启开启提醒 0 || 1
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "B000A122", REMARK_DATA: "签到页面-提醒", ITEM_VALUE: ITEM_VALUE });
}

// 活动规则按钮事件
export const B000A123 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "B000A123", REMARK_DATA: "签到页面-活动规则" });

// 点击抽奖按钮事件
export const B000A124 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "B000A124", REMARK_DATA: "签到页面-点击抽奖" });

// 查看已获得福利
export const B000A125 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "B000A125", REMARK_DATA: "签到页面-查看已获得福利" });

// 开启礼包
export const ACB0F001 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0F001", REMARK_DATA: "签到页面-连续7天签到开启礼包" });

// 分享得惊喜按钮
export const ACB0F002 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0F002", REMARK_DATA: "签到页面-分享得惊喜按钮" });

// 分享按钮
export const ACB0F003 = (context, args) => http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0F003", REMARK_DATA: "签到页面-分享赚取翻牌机会" });

// 分享渠道
export const ACB0F004 = (context, args) => {
    let ITEM_VALUE = context.currClickShareBtn.SHARE_PLACE; // 分享渠道
    let ITEM_VALUE1 = "1"; // 是否分享成功
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0F004", REMARK_DATA: "分享渠道", ITEM_VALUE: ITEM_VALUE, ITEM_VALUE1: ITEM_VALUE1 });
}

// 精选产品点击
export const ACB0F007 = (context, args) => {
    let ITEM_VALUE = context.crrrClickItem.PROD_ID; // 产品ID
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0F007", REMARK_DATA: "签到页面-精选产品点击", ITEM_VALUE: ITEM_VALUE });
}

// 精选活动banner点击
export const ACB0F008 = (context, args) => {
    let ITEM_VALUE = context.currClickItem.ID; // bannerId
    let ITEM_VALUE1 = context.currClickItem.ACTITY_NAME; // 内容名称
    // let ITEM_VALUE2 = context.currClickItem.IMG_LINK_URL; // 内容ID
    return http.postPoint(config.baseUrlHost, config.baseUrlPath, { FUNCTION_ID: "ACB0F008", REMARK_DATA: "签到页面-精选活动banner点击", ITEM_VALUE: ITEM_VALUE, ITEM_VALUE1: ITEM_VALUE1 });
}