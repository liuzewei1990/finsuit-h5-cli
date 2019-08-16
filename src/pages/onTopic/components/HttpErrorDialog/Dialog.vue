<template>
  <mask-box v-model="visible" :show-loading="false" :isTransparent="false" @on-show="$modalHelper.open(appendElement)" @on-hide="$modalHelper.close(appendElement)">

    <div class="error-toast bounceIn" :class="className">
      <div class="main">
        <img class="content" :src="require('./icon_status_error.png')" alt="">
      </div>

      <div class="head">
        <h6 class="title" v-if="title">{{title}}</h6>
        <span class="desc" v-if="desc">{{desc}}</span>
      </div>

      <div class="footer">
        <Button class="btn" v-if="btnTxt" :class="{'btn-dis':btnDisabled}" :show-loading="btnLoading" :disabled="btnDisabled" @click.native="btnCallback">{{btnTxt}}</Button>
        <a class="link" href="javascript:void(0);" v-if="linkTxt" @click="linkCallback">{{linkTxt}}</a>
      </div>
    </div>

  </mask-box>
</template>

<script>
import Button from "@onTopic/components/Button"
import MaskBox from "@onTopic/components/MaskBox"
export default {
  components: { MaskBox, Button },
  props: ["type", "appendElement", "className", "visible", "title", "desc", "content", "btnTxt", "btnDisabled", "btnLoading", "btnCallback", "linkTxt", "linkUrl", "linkCallback"],
}
</script>

<style lang="less" scoped>
@import url(./style.less);
</style>
