

import "@common/finsuit-assets/less/common.less"
import "@common/finsuit-assets/less/animate.less"
import "@common/finsuit-assets/icomoon/style.css"

import "./libs/flexible.js"
import "./libs/fastclick.js"

import Toast from "./libs/toast.js"
import Loading from "./libs/loading.js"
import bcBridge from "./libs/bcBridge.js"
import utils from "./libs/utils.js"
import modalHelper from "./libs/modalHelper.js"
import login from "./libs/login.js"
import browser from "./libs/browser.js"
import downloadApp from "./libs/downloadApp.js"
import bootstrap from "./libs/bootstrap.js"

import confirm from "@common/finsuit-components/Confirm/index.js"
import filters from "./libs/filters.js"


const finsuit = function(Vue,options = {}){

    Vue.prototype["$Toast"] = Toast;
    Vue.prototype["$Loading"] = Loading;
    Vue.prototype["$bcBridge"] = bcBridge;
    Vue.prototype["$utils"] = utils;
    Vue.prototype["$modalHelper"] = modalHelper;
    Vue.prototype["$login"] = login.login;
    Vue.prototype["$checkLogin"] = login.checkLogin;
    Vue.prototype["$checkToLogin"] = login.checkToLogin;
    Vue.prototype["$browser"] = browser;
    Vue.prototype["$downloadApp"] = downloadApp;
    
    Vue.use(confirm);
    Vue.use(filters);

    Vue.prototype["$bootstrap"] = bootstrap;

    if (process.env.NODE_ENV !== 'production') {
        let Vconsole = require("vconsole");
        const vConsole = new Vconsole();
        Vue.use(vConsole)
    }

}


export default{
    install:finsuit
}