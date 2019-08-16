import { Base64 } from "js-base64";
import config from "@newSign/config/config.index.js";


let u = navigator.userAgent;
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

let APP_FLAG;
if (u.indexOf("besharp") != -1) {
    APP_FLAG = 'BC'
} else if (u.indexOf("pincai") != -1) {
    APP_FLAG = 'PC'
} else {
    APP_FLAG = 'OUTLINK'
}

// 调用安卓和ios 必须双引号
export default {

    APP_FLAG: APP_FLAG,

    isApp () {
        if (u.indexOf("besharp") != -1) {
            sessionStorage.setItem("isAppPath", 1);
            return true
        } else if (u.indexOf("pincai") != -1) {
            sessionStorage.setItem("isAppPath", 1);
            return true
        } else {
            sessionStorage.setItem("isAppPath", 0);
            return false
        }
    },
    goLogin () {//跳原生登录页面
        let data = Base64.encode(JSON.stringify({ type: "1" }))
        try {
            if (isAndroid && window.android) {
                window.android.jsNeedLogin(data)
            } else if (isIOS) {
                if (window.IOSWebJSInterface) {
                    window.IOSWebJSInterface.jsNeedLogin(data)
                } else if (window.webkit) {
                    try {
                        window.webkit.messageHandlers.jsNeedLogin.postMessage(data)
                    } catch (err) {
                        console.log("error window.webkit.messageHandlersjsNeedLogin.postMessage( )")
                    }
                }
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    /**
     * H5打开新的H5页面
     * @param {Str} url 目标地址
     * @param {Str} title 标题
     * @param {Str} NEED_LOGIN 打开页面之前是否需要强制登录，“1”： 强制登录，不传或者传"0", 为正常打开。 默认不用传
     */
    openWebview (url = "", title = "", NEED_LOGIN = "") {
        let data = {
            H5_URL: url,
            TITLE: title,
            NEED_LOGIN: NEED_LOGIN
        }
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.gotoSecondaryH5Page(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoSecondaryH5Page(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoSecondaryH5Page.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.gotoSecondaryH5Page( )")
                }
            }
        }
    },
    /**
     * 分享文本+链接
     * @param {Obj} data 
     * data.share_type: 1微信，2朋友圈，3 qq，4qq空间
     * data.share_title: 分享标题
     * data.share_msg: 分享内容
     * data.share_url: 分享链接
     */
    h5Share (data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.h5Share(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5Share(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5Share.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5Share( )")
                }
            }
        }
    },
    /**
     * 分享图片到朋友圈
     * @param {Obj} data 
     * data.type: 1微信，2朋友圈，3 qq，4qq空间
     * data.img: 分享的图片:base 64 字符串
     * data.thumb: 缩略图 base64 字符串
     */
    h5ShareImage (data) {
        let dataAndroid = JSON.stringify(data);
        let dataIOS = JSON.stringify(data)
        if (isAndroid && window.android) {
            window.android.h5ShareImage(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5ShareImage(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5ShareImage.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5ShareImage( )")
                }
            }
        }
    },
    updateTitle (title) {
        document.title = title
        let dataAndroid = Base64.encode(encodeURIComponent(title));
        if (isAndroid && window.android) {
            window.android.updateTitle(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.updateTitle(title)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.updateTitle.postMessage(title);
                } catch (err) {
                    console.log("error window.webkit.updateTitle( )")
                }
            }
        }
    },
    h5OpenApiBuy (data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.h5OpenApiBuy(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5OpenApiBuy(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5OpenApiBuy.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5OpenApiBuy( )")
                }
            }
        }
    },
    saveImgAlbumForBack (data) {
        if (isAndroid && window.android) {
            window.android.saveImgAlbumForBack(data);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.saveImgAlbumForBack(data)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.saveImgAlbumForBack.postMessage(data);
                } catch (err) {
                    console.log("error window.webkit.saveImgAlbumForBack( )")
                }
            }
        }
    },
    sendLoginResult () {
        if (isAndroid && window.android) {
            window.android.sendLoginResult();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.sendLoginResult()
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.sendLoginResult.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.sendLoginResult( )")
                }
            }
        }
    },
    gotoMainPage () {
        if (isAndroid && window.android) {
            window.android.gotoMainPage();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoMainPage()
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoMainPage.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.gotoMainPage( )")
                }
            }
        }
    },
    /**
     * 分享微信小程序
     * @param {Obj} data
     * data.share_type: 1
     * data.type : 分享小程序的版本: 正式版:0，测试版:1，体验版:2
     * data.url: ""
     * data.user_name: 
     * data.path: 打开小程序的路径
     * data.title: 分享标题
     * data.description: 分享描述
     * data.img: 分享图片
     * data.thumb: 兼容旧版节点的图片，小于32k， 新版优先使用hdImageData
     * 
     */
    h5ShareWXProgram (data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.h5ShareWXProgram(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5ShareWXProgram(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5ShareWXProgram.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5ShareWXProgram( )")
                }
            }
        }
    },
    // H5获取加密请求参数
    h5SaltSign (data) {
        let newData = Base64.encode(JSON.stringify(data));
        if (window.android) {
            window.android.h5SaltSign(newData)
        }
        if (window.IOSWebJSInterface) {
            window.IOSWebJSInterface.h5SaltSign(newData)
        }
        if (window.webkit && window.webkit.messageHandlers) {
            try {
                window.webkit.messageHandlers.h5SaltSign.postMessage(newData)
            } catch (err) {
                console.log("error window.webkit.messageHandlers.h5SaltSign.postMessage('')")
            }
        }
    },

    /**
     * 废弃方法
     * @param {*} H5_URL url
     * @param {*} NEED_LOGIN 1 : 需要登录，其他，不需要
     * @param {*} USE_LINK 1 : 跳转时候使用的url为“H5_URL”，否者使用BUTTON_LISTS接口获取到的活动链接
     */
    xxx (H5_URL = "", NEED_LOGIN = "1", USE_LINK = "1") {
        let data = {
            LINK_TO: "WEB_H5",
            H5_URL: H5_URL,
            NEED_LOGIN: NEED_LOGIN,
            USE_LINK: USE_LINK
        };
        let base = Base64.encode(JSON.stringify(data));
        let http = APP_FLAG === "BC" ? "besharp" : "pincai";
        let url = http + '://finsuit/applink?pjsonkey=' + base;
        if (window.android || window.IOSWebJSInterface || window.webkit) {
            window.location.href = url
        } else {
            console.error("该浏览器不支持跳转")
        }
    }

}