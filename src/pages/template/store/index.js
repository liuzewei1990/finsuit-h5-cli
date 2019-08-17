// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'
import {state,getters,mutations} from '@common/finsuit-store/index.js'
Vue.use(Vuex);

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    modules: {},
    // plugins: [createLogger()]
});