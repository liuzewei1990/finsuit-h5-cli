<template>
  <button :style="buttonStyle" class="weui-btn" :class="classes" :disabled="disabled" :type="actionType">
    <i class="weui-loading" v-if="showLoading"></i>
    <slot>{{ text }}</slot>
  </button>
</template>

<script>

export default {
  name: 'x-button',
  props: {
    type: {
      default: 'default'
    },
    disabled: Boolean,
    mini: Boolean,
    recta: Boolean,
    plain: Boolean,
    text: String,
    actionType: String,
    showLoading: Boolean,
    link: [String, Object],
    gradients: {
      type: Array,
      validator: function (val) {
        return val.length === 2
      }
    }
  },
  computed: {
    noBorder () {
      return Array.isArray(this.gradients)
    },
    buttonStyle () {
      if (this.gradients) {
        return {
          background: `linear-gradient(90deg, ${this.gradients[0]}, ${this.gradients[1]})`,
          color: '#FFFFFF'
        }
      }
    },
    classes () {
      return [
        this.recta ? "weui-btn-recta" : "",
        {
          'weui-btn_disabled': !this.plain && this.disabled,
          'weui-btn_plain-disabled': this.plain && this.disabled,
          'weui-btn_mini': this.mini,
          'vux-x-button-no-border': this.noBorder
        },
        !this.plain ? `weui-btn_${this.type}` : '',
        this.plain ? `weui-btn_plain-${this.type}` : '',
        this.showLoading ? `weui-btn_loading` : ''
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import "./less/weui-button.less";
@import "./less/weui-loading.less";

.weui-btn.vux-x-button-no-border:after {
  display: none;
}
</style>
