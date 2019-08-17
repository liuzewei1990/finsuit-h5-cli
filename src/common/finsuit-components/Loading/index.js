import Vue from 'vue';
import loading from './loading.vue'
const LoadingConstructor = Vue.extend(loading);
let loadingPool = [];

// 获取一个toast组件实例
let getAnInstance = () => {
    // if (loadingPool.length > 0) {
    //     let instance = loadingPool[0];
    //     loadingPool.splice(0, 1);
    //     return instance;
    // }
    return new LoadingConstructor({
        el: document.createElement('div')
    });
};


let returnAnInstance = instance => {
    if (instance) {
        loadingPool.push(instance);
    }
};

let removeDom = event => {
    if (event.target.parentNode) {
        // event.target.parentNode.removeChild(event.target);
        event.target.parentNode.remove();
    }
};

LoadingConstructor.prototype.close = function (timer = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            this.visible = false;
            this.$el.addEventListener('transitionend', removeDom);
            this.isShow = false;
            this.$el.remove();
            // returnAnInstance(this);
            resolve();
        }, timer);
    })
};

LoadingConstructor.prototype.show = async function (appendElement) {
    await this.close();
    this.isShow = true;
    
    if (appendElement) {
        this.$el.style.position = this.$el.querySelector(".h5plus-loading-toast").style.position = "absolute";
        this.$el.style.position = this.$el.querySelector(".h5plus-loading-toast").style.background = "none";
        appendElement.appendChild(this.$el);
    } else {
        this.$el.style.position = this.$el.querySelector(".h5plus-loading-toast").style.background = "rgba(0, 0, 0, 0.75)";
        this.$el.style.position = "fixed";
        document.body.appendChild(this.$el);
    }
    Vue.nextTick(() => {
        this.visible = true;
        this.$el.removeEventListener('transitionend', removeDom);
    });
}

let Loading = (options = {}) => {
    let instance = getAnInstance();
    instance.isShow = false;
    instance.message = typeof options === 'string' ? options : options.message;
    instance.position = options.position || 'middle';
    instance.className = options.className || '';
    instance.iconClass = options.iconClass || '';
    return instance;
};

export default Loading;