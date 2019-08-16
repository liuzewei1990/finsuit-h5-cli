

/**
 * 埋点指令
 */
export default {
    install: (Vue, api = {}) => {
        const apis = api;

        Vue.directive("point", {
            _apiName: "",
            _apiParams: {},
            _api () {
                console.log("指令apis参数：", this._apiParams);

                apis[this._apiName] && apis[this._apiName](this._apiParams);
            },
            // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
            bind (el, binding) {
                console.log("bind", binding);
                let _this = binding.def;

                // 处理参数
                _this._apiName = binding.arg;

                // 处理click修饰符
                if (binding.modifiers.click) el.addEventListener("click", _this._api.bind(_this), false);

                // 处理show修饰符
                if (binding.modifiers.show) { }
            },
            // 当被绑定的元素插入到 DOM 中时……
            inserted (el) {
                console.log("inserted")
            },
            update (el, binding, oldVnode) {
                let _this = binding.def;
                console.log("update", oldVnode);
                let newValue = binding.value;
                _this._apiParams = newValue;
            },
            componentUpdated (el, binding) {
                console.log("componentUpdated", binding);
            },
            unbind () {
                console.log("unbind");

            }
        })
    }
}

