import http from '@newSign/apis/http.js'
import config from '@newSign/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */


// 获取抽奖信息列表
export const getSignInData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GET_MEMBER_FOR_H5", params, head, false, false)

// 中奖纪录
export const getPrizeHistory = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GET_PRIZEINFO_FOR_ROLL", params, head, false, false)

// 获取活动规则
export const getRule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "REQ_GET_ACTIVITY_OFFICIAL_INFO", params, head, false, false)

// 我的中奖记录
export const getMyPrizeHistory = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GET_PRIZEINFO_FOR_LIST", params, head, false, false)

// 用户签到
export const signIn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_TO_THE_ACTITY", params, head, false, false)
signIn.apiType = "SINGINF_TO_THE_ACTITY";

// 用户抽奖
export const postUserLuckDraw = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_TO_OPEN_THE_PRIZE", params, head, false, false)

// 用户开启大奖
export const postUserMaxLuckDraw = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_EXTRACT_THE_BIG_PRIZE", params, head, false, false)

// 签到提醒开关
export const postSignInSwitch = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_CHANGE_REMIND_SWITCH", params, head, false, false)

// 分享成功增加抽奖机会
export const postUserLuckDrawAddNums = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_CHANGE_OPEN_PRIZE_SHARE", params, head, false, false)

// 获取活动列表
export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_FIELD_CONFIG", params, head, false, false)

// 获取精彩产品
export const getGoodsList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_SELECTED_PRODUCTS_INFO", params, head, false, false)

// 获取精选产品详情入口
export const getGoodsRedirectUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RECOMMEND_PRD_LIST", params, head, false, false)

// 获取下载app帮助页面图片地址
export const getDowloadAppHelpData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GUIDE_PAGE_PIC", params, head, false, false)

/**
 * 公共接口
 * 
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false)
