

/**
 * 埋点指令
 */
export default {
    install: (Vue, api = {}) => {
        const apis = api;

        Vue.directive('tack', {
            bind (el, binding, vnode) {
                console.log(binding);

                el.style.position = 'fixed';
                const s = (binding.arg == 'left' ? 'left' : 'top');
                el.style[s] = binding.value + 'px';

                el.addEventListener("click", function () {
                    console.log("binding.value", binding.value);

                }, false);
            }
        })
    }
}

