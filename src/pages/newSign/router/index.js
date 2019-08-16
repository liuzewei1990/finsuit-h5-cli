import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import ErrorPage from "@newSign/layouts/error.vue"

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        {
            name: 'index',
            path: '/',
            component: require('@newSign/view/main.vue').default,
            meta: { title: '签到', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: 'history',
            path: '/history',
            component: () => import(/* webpackChunkName: "history" */ '@newSign/view/history.vue'),
            meta: { title: '中奖纪录', requiresAuth: true, keepAlive: false }
        },
        {
            name: 'dowloadAppHelp',
            path: '/dowloadAppHelp',
            component: () => import(/* webpackChunkName: "dowloadAppHelp" */ '@newSign/view/dowloadAppHelp.vue'),
            meta: { title: '下载帮助', requiresAuth: true, keepAlive: false }
        },
        {
            name: 'bcBridge',
            path: '/bcBridge',
            component: () => import(/* webpackChunkName: "bcBridge" */ '@newSign/view/bcBridge.vue'),
            meta: { title: 'bcBridge测试', requiresAuth: true, keepAlive: false }
        },
        // 该路由是兼容老版本签到路由，小程序中入口在老版本中是写死的地址  /#/Signin
        {
            name: "Signin",
            path: "/Signin",
            redirect: "/",
        }

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
