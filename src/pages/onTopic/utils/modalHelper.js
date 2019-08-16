/**
 * 模态框辅助器
 * 场景：模态框打开或关闭
 * 问题：解决模态框打开滚动穿透问题。
 */

export default (function (bodyCls) {
    var scrollTop;

    return {
        open: function (targetEle) {
            let el = targetEle || document.body;
            scrollTop = document.scrollingElement.scrollTop;
            el.classList.add(bodyCls);
            el.style.top = -scrollTop + 'px';
        },
        close: function (targetEle) {
            let el = targetEle || document.body;
            el.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
            el.style.top = "auto";
        }
    };
})('modal-open');