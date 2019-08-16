import Vue from 'vue';
import DialogComponent from './Dialog.vue'
const ToastConstructor = Vue.extend(DialogComponent);
let toastPool = [];

let getAnInstance = () => {
    if (toastPool.length > 0) {
        let instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

let returnAnInstance = instance => {
    if (instance) {
        toastPool.push(instance);
    }
};

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.remove();
    }
};

ToastConstructor.prototype.close = function () {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    returnAnInstance(this);
};

let Dialog = (options = {}) => {
    let instance = getAnInstance();
    instance.close();
    instance.visible = true;
    instance.type = options.type || '1';
    instance.appendElement = options.appendElement || document.body;
    instance.className = options.className || '';
    instance.title = options.title || '';
    instance.desc = options.desc || '';
    instance.content = options.content || '';
    instance.btnTxt = options.btnTxt || '';
    instance.btnDisabled = options.btnDisabled || false;
    instance.btnLoading = options.btnLoading || false;
    instance.linkTxt = options.linkTxt || '';
    instance.linkUrl = options.linkUrl || '';
    instance.btnCallback = options.btnCallback || function () { };
    instance.linkCallback = options.linkCallback || function () { };

    if (options.appendElement) {
        options.appendElement.appendChild(instance.$el);
    } else {
        document.body.appendChild(instance.$el);
    }

    return instance;
};

export default Dialog;