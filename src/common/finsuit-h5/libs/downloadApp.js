


/**
 * 站外下载app使用
 * 说明：url参数中指定FROM_APP_FLAG = PC | BC 来源appFlag标识可下载指定的APP,默认下载比财
 */

export default function (text) {
    const FROM_APP_FLAG = this.$store.state.FROM_APP_FLAG;
    const OS = this.$browser.OS;
    const APP_FLAG_TEXT = {
        BC: "比财",
        PC: "拼财"
    }

    this.$iosConfirm({
        title: "提示",
        text: text || `是否前往下载${APP_FLAG_TEXT[FROM_APP_FLAG]}APP参与活动`,
        input: false,
        placeholder: '',
        cancelText: '稍后下载',
        okText: '去下载',
        remindDuration: 650,
        appendChildClass: "",
    }).then((btn) => {
        setTimeout(() => {
            window.location.href = getUrl();
        }, 500);
    }).catch(() => { })

    function getUrl () {
        let url;
        if (FROM_APP_FLAG == "PC") {
            if (OS === "Android") {
                url = 'https://android.myapp.com/myapp/detail.htm?apkName=com.pc.finance&apkCode=108';
            } else {
                url = 'https://itunes.apple.com/app/id1450232395?mt=8';
            }
        } else {
            url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage";
        }
        return url;
    }
}