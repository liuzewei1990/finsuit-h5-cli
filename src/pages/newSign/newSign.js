/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import Guide from "./view/guide.vue"
import router from "./router"
import store from "./store/index"
import * as api from "@newSign/apis"
import * as trackEvents from "@newSign/apis/track-events-api.js"

import _ from "lodash"
import VTrack from "v-track"

import config from "@newSign/config/config.index.js"
import bcBridge from "@newSign/utils/bcBridge.js"
import appCallback from "@newSign/utils/appCallback.js"
import utils from "@newSign/utils/utils.js"
import modalHelper from "@newSign/utils/modalHelper.js"

import "@newSign/assets/less/common.less"
import "@newSign/assets/less/animate.less"
import "@newSign/assets/icomoon/style.css"

import 'lib-flexible/flexible'
import "@newSign/router/routerController.js"
import "@newSign/plugins/fastclick.js"
import "@newSign/plugins/toast.js"
import "@newSign/plugins/loading.js"

Vue.prototype["$api"] = api;
Vue.prototype["$Config"] = config;
Vue.prototype["$bcBridge"] = bcBridge;
Vue.prototype["$utils"] = { ..._, ...utils };
Vue.prototype["$modalHelper"] = modalHelper;

Vue.use(VTrack, { trackEvents })

if (process.env.NODE_ENV !== 'production') {
    let Vconsole = require("vconsole");
    const vConsole = new Vconsole();
    Vue.use(vConsole)
}

// Vue.config.devtools = false;
// Vue.config.silent = true;


// APP登录环境
if (bcBridge.APP_FLAG === "PC" || bcBridge.APP_FLAG === "BC") {

    // APP登录环境 APP主动触发loginResult
    window.loginResult = argument => {
        appCallback.appLogin(argument).then(bootstrap);
    };

    // APP未登录 去登录 登录成功触发loginResult
    window.unloginResult = (argument) => {
        bcBridge.goLogin();
    }

    // 用户取消登录
    window.loginCanceled = (argument) => {
        console.log("用户取消登录", argument);
        setTimeout(() => {
            bcBridge.gotoMainPage();
        }, 800);
    }

} else {

    let queryStr = utils.getQueryStr();
    // 小程序登录
    if (queryStr.PMP_FLAG == 1 && queryStr.TOKEN && queryStr.MEMBER_ID) {
        appCallback.pmpLogin(queryStr).then(bootstrap);
    } else {
        bootstrapGuide();
    }
}


function bootstrap () {
    const app = new Vue({
        router,
        store,
        components: { App },
        template: "<App/>"
    });
    app.$mount('#app');
}

function bootstrapGuide () {
    const app = new Vue({
        components: { Guide },
        template: "<Guide/>"
    });
    app.$mount('#app');
}



