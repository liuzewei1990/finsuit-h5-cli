import http from '@common/finsuit-http/index.js'
import config from '@template/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

// 获取每日一题活动信息
export const getTopicInfo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_QUESTION_DATA", params, head, false, false)

// 用户提交答案 以及获取奖励列表
export const postTopicInfo = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "PUT_QUESTION_ANSWER", params, head, false, false)

// 用户领取奖励
export const getReward = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ANSWER_REWARD", params, head, false, false)

// 用户分享增加答题机会
export const postTopicNum = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SHARE_ACTIVITY", params, head, false, false)

// 获取开户有奖银行列表
export const getBankList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_USER_OPEN_BANK_INFO", params, head, false, false)

// 获取开户有奖银行列表
export const getBankReward = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ANSWER_OPEN_ACCOUNT_REWARD", params, head, false, false)

// 获取活动列表
export const getRule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_RULE", params, head, false, false)

// 获取精彩产品
export const getGoodsList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_SELECTED_PRODUCTS_INFO", params, head, false, false)

// 获取精选产品详情入口
export const getGoodsRedirectUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RECOMMEND_PRD_LIST", params, head, false, false)

// 获取活动列表
export const getActivityList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_ACTIVITY_FIELD_CONFIG", params, head, false, false)

/**
 * 公共接口
 * 
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false)

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false)

// 获取产品详情入口
export const getProducdDetailUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RECOMMEND_PRD_LIST", params, head, false, false)

// 获取下载app帮助页面图片地址
export const getDowloadAppHelpData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GUIDE_PAGE_PIC", params, head, false, false)
