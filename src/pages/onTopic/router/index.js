import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import ErrorPage from "@onTopic/layouts/error.vue"

export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [
        {
            name: 'index',
            path: '/',
            component: require('@onTopic/view/main').default,
            meta: { title: '每日一题', requiresAuth: false, keepAlive: true },
            // redirect: "/",
        },
        {
            name: "shareLink",
            path: "/shareLink",
            component: () => import(/* webpackChunkName: "shareLink" */ '@onTopic/view/shareLink/index.vue'),
            meta: { title: '每日一题', requiresAuth: false, keepAlive: false },
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
