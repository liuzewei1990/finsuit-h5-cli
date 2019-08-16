<template>
  <mask-box v-if="isLoad" v-model="visible" :show-loading="false" :defaultcloseBtnVisible="false" :isTransparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">

    <!-- 引入shareLink页面组件 -->
    <share-link class="share-link-conponent" ref="shareLinkComponent" :isShare="true"></share-link>

    <!-- 底部btn -->
    <Button slot="footer" class="share-link-btn" @click.native="btnConfirm">{{options.btnText}}</Button>

  </mask-box>
</template>

<script>
import Button from "@onTopic/components/Button"
import MaskBox from "@onTopic/components/MaskBox"
import ShareLink from "@onTopic/view/shareLink"
import html2canvas from "html2canvas"
import bus from "@onTopic/utils/bus.js"
export default {
  components: { MaskBox, Button, ShareLink },
  data () {
    return {
      visible: false,
      isLoad: false,
      options: {}
    }
  },

  methods: {
    open (options = {}) {
      this.isLoad = true;
      this.options = options;
      // 这里为什么要$nextTick 因为isLoad = true这个异步问题会导致$modalHelper.open不执行
      this.$nextTick(() => {
        this.visible = true;
      })
    },
    async html2canvas () {
      let canvas = await html2canvas(this.$refs.shareLinkComponent.$el, { allowTaint: true, useCORS: true });
      return canvas.toDataURL();
    },

    // 点击确认
    async btnConfirm () {
      this.visible = false;
      let base64 = await this.html2canvas();
      bus.$emit("shareImageBtnClick", base64);
    }
  }
}
</script>

<style lang="less" scoped>
.share-link-container {
  width: 564px;
  height: 1000px;
  overflow: auto;
  background: #fff;
}
.share-link-conponent {
  transform-origin: top center;
  transform: scale(0.6) translate(0, -50%);
  position: absolute;
  left: 0;
  top: 45%;
  width: 100%;
}

.share-link-btn {
  margin: 50px auto;
  width: 80% !important;
  line-height: 80px;
  color: #fff !important;
  background: linear-gradient(to bottom, #3aa9f3, #3865ff);
  border-radius: 500px !important;
  font-size: 28px;
  &:not(.weui-btn_disabled):visited {
    color: #ffffff;
  }
  &:not(.weui-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
