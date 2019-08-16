/* eslint-disable no-new */
import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store/index"
import * as api from "@enjoyNew/apis"
import * as trackEvents from "@enjoyNew/apis/track-events-api.js"

import _ from "lodash"
import VTrack from "v-track"

import config from "@enjoyNew/config/config.index.js"
import bcBridge from "@enjoyNew/utils/bcBridge.js"
import utils from "@enjoyNew/utils/utils.js"
import modalHelper from "@enjoyNew/utils/modalHelper.js"
import login from "@enjoyNew/utils/login.js"
import notNewUserPublicDialog from "@enjoyNew/utils/notNewUserPublicDialog.js"
import handlePrdRate from "@enjoyNew/utils/handlePrdRate.js"
import toRealNameAuthUrl from "@enjoyNew/utils/toRealNameAuthUrl.js"
import toEnjoyProducdDetailUrl from "@enjoyNew/utils/toEnjoyProducdDetailUrl.js"
import toProducdDetailUrl from "@enjoyNew/utils/toProducdDetailUrl.js"
import toTargetProducdDetailUrl from "@enjoyNew/utils/toTargetProducdDetailUrl.js"
import browser from "@enjoyNew/utils/browser.js"
import dowloadAppHelp from "@enjoyNew/utils/dowloadAppHelp.js"
import bootstrap from "@enjoyNew/utils/bootstrap.js"
import filters from "@enjoyNew/utils/filters.js"

import CommonDialog from "@enjoyNew/components/CommonDialog"
import Confirm from "@enjoyNew/components/Confirm/index.js"

import "@enjoyNew/assets/less/common.less"
import "@enjoyNew/assets/less/animate.less"
import "@enjoyNew/assets/icomoon/style.css"

import "lib-flexible/flexible"
import "@enjoyNew/router/routerController.js"
import "@enjoyNew/plugins/fastclick.js"
import "@enjoyNew/plugins/toast.js"
import "@enjoyNew/plugins/loading.js"

Vue.prototype["$api"] = api;
Vue.prototype["$trackEvents"] = trackEvents;
Vue.prototype["$CommonDialog"] = CommonDialog;
Vue.prototype["$Config"] = config;
Vue.prototype["$bcBridge"] = bcBridge;
Vue.prototype["$utils"] = { ..._, ...utils };
Vue.prototype["$modalHelper"] = modalHelper;
Vue.prototype["$login"] = login.login;
Vue.prototype["$checkLogin"] = login.checkLogin;
Vue.prototype["$NotNewUserPublicDialog"] = notNewUserPublicDialog;
Vue.prototype["$handlePrdRate"] = handlePrdRate;
Vue.prototype["$toRealNameAuthUrl"] = toRealNameAuthUrl;
Vue.prototype["$toEnjoyProducdDetailUrl"] = toEnjoyProducdDetailUrl;
Vue.prototype["$toProducdDetailUrl"] = toProducdDetailUrl;
Vue.prototype["$toTargetProducdDetailUrl"] = toTargetProducdDetailUrl;
Vue.prototype["$browser"] = browser;
Vue.prototype["$dowloadAppHelp"] = dowloadAppHelp;
Vue.prototype["$bootstrap"] = bootstrap;

setTimeout(() => {
    trackEvents.ACB0L001();
}, 1000);

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




