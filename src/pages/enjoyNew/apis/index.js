import http from '@enjoyNew/apis/http.js'
import config from '@enjoyNew/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */


// 获取抽奖信息列表
export const getMsgScrollList = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_CAROUSEL_NEWS", params, head, false, false)
// 获取新手专享体验金
export const getEnjoyMoneyData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_FICTITIOUS_WELFARE", params, head, false, false)
// 获取新手专享体验金状态
export const getEnjoyMoneyStatus = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_CLICK_FIC_WEL", params, head, false, false)
// 用户体验金使用及详情
export const getEnjoyMoneyUseStatus = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_FIC_PRD_USE", params, head, false, false)
// 新手专享福利信息
export const getEnjoyListData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_EXCLUSIVE_BENEFITS", params, head, false, false)
// 新手专享优惠券领取
export const postEnjoyCoupon = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_COUPON_DRAW", params, head, false, false)
// 新手专享实名红包领取
export const postEnjoyAuthReward = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_REWARD_DRAW", params, head, false, false)
// 获取新手产品数据
export const getEnjoyProducds = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_PRD_INFO", params, head, false, false)
// 获取推荐产品
export const getUpProducds = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_RECOMMEND_PRD", params, head, false, false)
// 新手专享产品点击验证用户状态
export const getEnjoyProducdStatus = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_CHECK_PRD_INFO", params, head, false, false)
// 活动规则
export const getEnjoyRule = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_RULE_INFO", params, head, false, false)


// 获取弹窗数据
export const getDialogData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "NOVICE_POPUP_INFO", params, head, false, false)


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
