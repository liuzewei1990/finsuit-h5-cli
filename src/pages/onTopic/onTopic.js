/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"
import * as api from "@onTopic/apis"
import * as trackEvents from "@onTopic/apis/track-events-api.js"
import VTrack from "v-track"
import Confirm from "@onTopic/components/Confirm/index.js"
import filters from "@onTopic/utils/filters.js"

import _ from "lodash"
import config from "@onTopic/config/config.index.js"

import bcBridge from "@onTopic/utils/bcBridge.js"
import utils from "@onTopic/utils/utils.js"
import modalHelper from "@onTopic/utils/modalHelper.js"
import login from "@onTopic/utils/login.js"
import browser from "@onTopic/utils/browser.js"
import downloadApp from "@onTopic/utils/downloadApp.js"
import bootstrap from "@onTopic/utils/bootstrap.js"



import CommonDialog from "@onTopic/components/CommonDialog"

import "@onTopic/assets/less/common.less"
import "@onTopic/assets/less/animate.less"
import "@onTopic/assets/icomoon/style.css"

import "lib-flexible/flexible"
import "@onTopic/router/routerController.js"
import "@onTopic/plugins/fastclick.js"
import "@onTopic/plugins/toast.js"
import "@onTopic/plugins/loading.js"

Vue.prototype["$api"] = api;
Vue.prototype["$trackEvents"] = trackEvents;
Vue.prototype["$CommonDialog"] = CommonDialog;
Vue.prototype["$Config"] = config;
Vue.prototype["$bcBridge"] = bcBridge;
Vue.prototype["$utils"] = { ..._, ...utils };
Vue.prototype["$modalHelper"] = modalHelper;
Vue.prototype["$login"] = login.login;
Vue.prototype["$checkLogin"] = login.checkLogin;
Vue.prototype["$checkToLogin"] = login.checkToLogin;
Vue.prototype["$browser"] = browser;
Vue.prototype["$downloadApp"] = downloadApp;
Vue.prototype["$bootstrap"] = bootstrap;


Vue.use(VTrack, { trackEvents });
Vue.use(Confirm);
Vue.use(filters);

if (process.env.NODE_ENV !== 'production') {
    let Vconsole = require("vconsole");
    const vConsole = new Vconsole();
    Vue.use(vConsole)
}

const app = new Vue({
    router,
    store,
    components: { App },
    template: "<App/>"
});

app.$bootstrap();

