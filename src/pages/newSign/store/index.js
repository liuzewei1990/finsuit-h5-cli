// 组装模块并导出 store 的文件
import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex);


const types = {
    PRIZE_INFO: "PRIZE_INFO",
}


// 导出需要的模块
export default new Vuex.Store({
    state: {

    },
    getters: {},

    mutations: {
        [types.PRIZE_INFO] (state, prizeInfo) {

        }
    },
    modules: {},
    // plugins: [createLogger()]
});