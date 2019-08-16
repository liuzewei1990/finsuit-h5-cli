import HttpErrorDialog from "@onTopic/components/HttpErrorDialog"
export default function (msg) {
    let httpErrorDialog = HttpErrorDialog({
        title: "咦~出错啦",
        desc: `错误原因：${msg || "系统 Msg Null"}`,
        // btnTxt: "客观别慌，喝杯茶~ 休息一下呢",
        btnCallback: () => { errorToast.close() },
        linkTxt: "比财客服微信号：bicaikefu"
    })
}
