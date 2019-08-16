<template>
  <mask-box v-model="visible" :show-loading="false" :isTransparent="false" @on-show="$modalHelper.open(appendElement)" @on-hide="$modalHelper.close(appendElement)">

    <!-- 板式1 -->
    <template v-if="type == '1'">
      <div class="box1 bounceIn" :class="className">
        <div class="head">
          <h6 class="title" v-if="title">{{title}}</h6>
          <span class="desc" v-if="desc">{{desc}}</span>
        </div>
        <div class="main">
          <img class="content" v-if="content" :src="content" alt="">
        </div>
        <div class="footer">
          <Button class="btn" v-if="btnTxt" :class="{'btn-dis':btnDisabled}" :show-loading="btnLoading" :disabled="btnDisabled" @click.native="btnCallback">{{btnTxt}}</Button>
          <a class="link" href="javascript:void(0);" v-if="linkTxt" @click="linkCallback">{{linkTxt}}</a>
        </div>
      </div>
    </template>

    <!-- 板式2 -->
    <template v-if="type == '2'">
      <div class="box2 bounceIn" :class="className">
        <div class="head">
          <h6 class="title" v-if="title">{{title}}</h6>
          <span class="desc" v-if="desc">{{desc}}</span>
        </div>
        <div class="main">
          <span v-if="content">{{content}}</span>
        </div>
        <div class="footer">
          <Button class="btn" v-if="btnTxt" :class="{'btn-dis':btnDisabled}" :show-loading="btnLoading" :disabled="btnDisabled" @click.native="btnCallback">{{btnTxt}}</Button>
          <span class="link" v-if="linkTxt" @click="linkCallback">{{linkTxt}}</span>
        </div>
      </div>
    </template>

  </mask-box>
</template>

<script>
import Button from "@enjoyNew/components/Button"
import MaskBox from "@enjoyNew/components/MaskBox.vue"
export default {
  components: { MaskBox, Button },
  props: ["type", "appendElement", "className", "visible", "title", "desc", "content", "btnTxt", "btnDisabled", "btnLoading", "btnCallback", "linkTxt", "linkUrl", "linkCallback"],
}
</script>

<style lang="less" scoped>
@import url(./box-1.less);
@import url(./box-2.less);

// 实名红包title专用字号
.main-auth-dialog .head .title {
  font-size: 70px !important;
}
</style>
