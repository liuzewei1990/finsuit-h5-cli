
import router from "@newSign/router"
import bcBridge from "@newSign/utils/bcBridge.js"

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        bcBridge.updateTitle(to.meta.title);
    }
    next();
})