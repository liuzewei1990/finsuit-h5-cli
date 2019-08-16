
import router from "@enjoyNew/router"
import bcBridge from "@enjoyNew/utils/bcBridge.js"

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        bcBridge.updateTitle(to.meta.title);
    }
    next();
})