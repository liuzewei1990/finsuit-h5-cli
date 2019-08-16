import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import ErrorPage from "@enjoyNew/layouts/error.vue"

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        {
            name: 'index',
            path: '/',
            component: require('@enjoyNew/view/main').default,
            meta: { title: '新手专享大礼包', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "moneyDetail",
            path: "/moneyDetail",
            component: () => import(/* webpackChunkName: "moneyDetail" */ '@enjoyNew/view/moneyDetail/index.vue'),
            meta: { title: '专享体验金', requiresAuth: false, keepAlive: false },
        },
        {
            name: "moneyResult",
            path: "/moneyResult",
            component: () => import(/* webpackChunkName: "moneyResult" */ '@enjoyNew/view/moneyResult/index.vue'),
            meta: { title: '专享体验金', requiresAuth: false, keepAlive: false },
        },
        {
            name: "moneyController",
            path: "/moneyController",
            component: () => import(/* webpackChunkName: "moneyController" */ '@enjoyNew/view/moneyController/index.vue'),
            meta: { title: '专享体验金', requiresAuth: false, keepAlive: false },
        },
        {
            name: "mainRule",
            path: "/mainRule",
            component: () => import(/* webpackChunkName: "mainRule" */ '@enjoyNew/view/mainRule/index.vue'),
            meta: { title: '活动规则', requiresAuth: false, keepAlive: true },
        },
        {
            name: "dowloadAppHelp",
            path: "/dowloadAppHelp",
            component: () => import(/* webpackChunkName: "dowloadAppHelp" */ '@enjoyNew/view/dowloadAppHelp/index.vue'),
            meta: { title: 'app下载帮助', requiresAuth: false, keepAlive: true },
        },

        // {
        //     name: 'error',
        //     path: '/error',
        //     component: ErrorPage,
        //     meta: { title: '错误' }
        // },
        // {
        //     path: '*',
        //     redirect: "/error",
        //     meta: { title: '404' }
        // },
    ]
})
