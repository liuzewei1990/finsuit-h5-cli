import wx from 'weixin-js-sdk';
import store from '../store/index';
import api from './../fetch/api.js';
// import { baseUrlHost } from "./../../config/env";
// import { baseUrlHost } from "./../config/env";
import { baseUrlHost, imgUrl } from './env.js';
// import { Toast,MessageBox } from 'mint-ui';

// 微信分享配置相关操作
function wxConfig () {
    let url = window.location.href;
    let wx_url;

    if (url.indexOf('?from=') == -1 && url.indexOf('?1=1&from=') == -1) {
        // 首次分享
        let url_arr = url.split('?');
        wx_url = url_arr[0].split('#')[0];
    } else {
        // 二次分享
        let url_arr = url.split('#');
        wx_url = encodeURIComponent(url_arr[0]);
    }
    // MessageBox(wx_url)
    // 获取wxParam
    api.commonApi('/finsuitPhone/deal', 'param_key={"head":{"TYPE":"GET_WEIXIN_SIGN","SESSION_ID":"' + store.getters.sessionId + '","TOKEN":"' + store.getters.token + '","DEVICE_ID":"' + store.getters.DEVICE_ID + '"},"param":{"POSTFIXURL":"' + wx_url + '"}}')
        .then(res => {
            let wxParam = res.data.wxParam;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端  打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: wxParam.appId, //'${wxParam.appId}',  必填，公众号的唯一标识
                timestamp: wxParam.timestamp, //'${wxParam.timestamp}', // 必填，生成签名的时间戳
                nonceStr: wxParam.nonceStr, //'${wxParam.nonceStr}', // 必填，生成签名的随机串
                signature: wxParam.signature, //'${wxParam.signature}',// 必填，签名，见附录1
                jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareQZone"] //   必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
}

function queryStr (urlArr) {
    let query = {};
    let url_query_string = urlArr[urlArr.length - 1];
    // alert(url_query_string+'000')
    let url_query_arr = url_query_string.split('&');
    for (let i = 0; i < url_query_arr.length; i++) {
        let list = url_query_arr[i].split('=');
        query[list[0]] = list[1];
    }
    if (query.SESSION_ID || query.SESSION_ID == 'null') {
        query.SESSION_ID = '';
    }
    if (query.TOKEN || query.TOKEN == 'null') {
        query.TOKEN = '';
    }
    if (query.DEVICE_ID || query.DEVICE_ID == 'null' || query.DEVICE_ID == 'undefined') {
        query.DEVICE_ID = '';
    }
    if (query.showTitle === '1' || query.showTitle === 1) {
        query.showTitle = 0;
    }
    if (!query.SOURCE) {
        query.SOURCE = 'OTHERS';
    }
    let wx_query_str = '';
    for (let name in query) {
        wx_query_str = wx_query_str + '&' + name + '=' + query[name];
    }
    return wx_query_str;
}

function urlInit (share_url) {
    let url = share_url //? share_url : window.location.href;
    let wx_url;
    // alert(url)
    if (url.indexOf('?from=') == -1 && url.indexOf('?1=1&from=') == -1) {
        // 首次分享
        let url_arr = url.split('?');
        let wx_query_str = queryStr(url_arr);
        wx_url = url_arr[0] + '?' + wx_query_str.substring(1);
        // alert(url_arr)
        // return url_arr[0]
        return wx_url
        // store.dispatch('WX_SHARE_MSG', {
        //     'share_item_url': wx_url
        // });
    } else {
        // 二次分享
        let url_arr = url.split('?');
        let vue_path = url_arr[1].split('#')[1];
        let wx_query_str = queryStr(url_arr);
        wx_url = url_arr[0] + '#' + vue_path + '?' + wx_query_str.substring(1);
        // alert(wx_url+'111')
        return wx_url
        // store.dispatch('WX_SHARE_MSG', {
        //     'share_item_url': wx_url
        // });
    }
}

function wxInit_input (share_url) {
    wx.ready(function () {
        // 处理url地址
        urlInit(share_url)
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: '还有谁想从我们这拿走iPhone Xs',//store.getters.wxShareMsg.AppMessage.share_title, // 分享标题
            desc: '玩签到，领礼品，福利天天有',//store.getters.wxShareMsg.AppMessage.share_description, // 分享描述
            link: baseUrlHost + '/finsuit/static/finsuit/vue/static/bicai.png',//store.getters.wxShareMsg.AppMessage.share_item_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: share_url,//store.getters.wxShareMsg.AppMessage.share_icon_url, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (ret) {
                // 用户确认分享后执行的回调函数
                // alert("分享给朋友分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("分享给朋友取消分享！");
            }
        });

        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: store.getters.wxShareMsg.Timeline.share_title, // 分享标题
            link: store.getters.wxShareMsg.Timeline.share_item_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: store.getters.wxShareMsg.Timeline.share_icon_url, // 分享图标
            success: function (ret) {
                // 用户确认分享后执行的回调函数
                // alert("分享到朋友圈分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("分享到朋友圈取消分享！");
            }
        });

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: store.getters.wxShareMsg.QQ.share_title, // 分享标题
            desc: store.getters.wxShareMsg.QQ.share_description, // 分享描述
            link: store.getters.wxShareMsg.QQ.share_item_url, // 分享链接
            imgUrl: store.getters.wxShareMsg.QQ.share_icon_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                // alert("QQ分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("QQ取消分享！");
            }
        });

        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: store.getters.wxShareMsg.Weibo.share_title, // 分享标题
            desc: store.getters.wxShareMsg.Weibo.share_description, // 分享描述
            link: store.getters.wxShareMsg.Weibo.share_item_url, // 分享链接
            imgUrl: store.getters.wxShareMsg.Weibo.share_icon_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                // alert("腾讯微博分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("腾讯微博取消分享！");
            }
        });

        //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQZone({
            title: store.getters.wxShareMsg.QZone.share_title, // 分享标题
            desc: store.getters.wxShareMsg.QZone.share_description, // 分享描述
            link: store.getters.wxShareMsg.QZone.share_item_url, // 分享链接
            imgUrl: store.getters.wxShareMsg.QZone.share_icon_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                // alert("分享到QQ空间分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("分享到QQ空间取消分享！");
            }
        });

        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            // alert("errorMSG:");
        });
    });
}
function getUrlAppFlag () {
    let url = decodeURIComponent(window.location.hash)
    let indexFirst = url.indexOf('APP_FLAG') + 9;
    let appflg = url.substring(indexFirst, indexFirst + 2)
    return appflg
}
// 微信分享相关操作
function wxInit (share_url) {
    // 处理url地址
    // urlInit(share_url);
    // let iconImg;

    // if(getUrlAppFlag()=='PC'){
    //     iconImg = "../../static/bicai.png";
    // }else{
    //     iconImg = store.getters.wxShareMsg.AppMessage.share_icon_url;
    // }
    // MessageBox(share_url)
    // 第一次分享链接  ---- 有一个？ 
    let params = {
        title: store.getters.wxShareMsg.AppMessage.share_title, // 分享标题
        desc: store.getters.wxShareMsg.AppMessage.share_description, // 分享描述
        link: share_url,//wx_url,//store.getters.wxShareMsg.AppMessage.share_item_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: store.getters.wxShareMsg.AppMessage.share_icon_url, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    }

    wx.ready(function () {
        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: params.title,
            desc: params.desc,
            link: params.link,
            imgUrl: params.imgUrl,
            type: params.type,
            dataUrl: params.dataUrl,
            success: function (ret) {
                // 用户确认分享后执行的回调函数
                // alert("分享给朋友分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("分享给朋友取消分享！");
            }
        });

        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: params.title,
            link: params.link,
            imgUrl: params.imgUrl,
            success: function (ret) {
                // 用户确认分享后执行的回调函数
                // alert("分享到朋友圈分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("分享到朋友圈取消分享！");
            }
        });

        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQQ({
            title: params.title,
            desc: params.desc,
            link: params.link,
            imgUrl: params.imgUrl,
            success: function () {
                // 用户确认分享后执行的回调函数
                // alert("QQ分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("QQ取消分享！");
            }
        });

        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        wx.onMenuShareWeibo({
            title: params.title,
            desc: params.desc,
            link: params.link,
            imgUrl: params.imgUrl,
            success: function () {
                // 用户确认分享后执行的回调函数
                // alert("腾讯微博分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("腾讯微博取消分享！");
            }
        });

        //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
        wx.onMenuShareQZone({
            title: params.title,
            desc: params.desc,
            link: params.link,
            imgUrl: params.imgUrl,
            success: function () {
                // 用户确认分享后执行的回调函数
                // alert("分享到QQ空间分享成功！");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert("分享到QQ空间取消分享！");
            }
        });

        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            // alert("errorMSG:");
        });
    });
}

export function inviteShare (type, isSelf, jsonShare) {
    if (type) {
        wxInit();
        console.log('dfdfdfdfdfdfdf')
    }
    if (isSelf) {
        store.dispatch('WX_SHARE_MSG_TITLE_DESC', {
            AppMessage: {
                share_title: jsonShare.title,
                share_description: jsonShare.description
            },
            Timeline: {
                share_title: jsonShare.title,
                share_description: jsonShare.description
            },
            QQ: {
                share_title: jsonShare.title,
                share_description: jsonShare.description
            },
            Weibo: {
                share_title: jsonShare.title,
                share_description: jsonShare.description
            },
            QZone: {
                share_title: jsonShare.title,
                share_description: jsonShare.description
            }
        });
    } else {
        store.dispatch('WX_SHARE_MSG_TITLE_DESC', {
            AppMessage: {
                share_title: '你的好友送你1000元银行理财体验金！',
                share_description: '千元福利，注册即可领取！'
            },
            Timeline: {
                share_title: '点击即可领取1000元银行理财本金！',
                share_description: '你的好友送你一份1000元银行理财本金，注册即可使用！'
            },
            QQ: {
                share_title: '你的好友送你1000元银行理财体验金！',
                share_description: '千元福利，注册即可领取！'
            },
            Weibo: {
                share_title: '点击即可领取1000元银行理财本金！',
                share_description: '你的好友送你一份1000元银行理财本金，注册即可使用！'
            },
            QZone: {
                share_title: '点击即可领取1000元银行理财本金！',
                share_description: '你的好友送你一份1000元银行理财本金，注册即可使用！'
            }
        });
    }
}

export default {
    wxConfig,
    wxInit,
    wxInit_input,
}