
/**
 * 原型方法：小程序以及站外app下载引流
 */

export default function () {

    if (this.$store.state.APP_FLAG === "PMP") {
        this.$router.push("/dowloadAppHelp")
    }
}