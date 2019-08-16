<template>
  <div class="banner" :style="{backgroundImage:`url(${bjImgSrc || defaultBjImgSrc})`}">
    <div class="title">
      <div class="title-icon">
        <img :src="titleImgSrc || defaultTitleImgSrc" alt="">
      </div>
      <span class="title-desc" v-show="descText">{{descText || defaultDescText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultBjImgSrc: "",
      defaultTitleImgSrc: "",
      defaultDescText: ""
    }
  },
  props: ["bjImgSrc", "titleImgSrc", "descText"]
}
</script>

<style lang="less" scoped>
.banner {
  height: 385px;
  background-size: 100% 100%;
  background-position: center center;
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    margin: 80px 0;
    .title-icon {
      width: 308px;
      height: 86px;

      img {
        height: 100%;
        width: 100%;
      }
    }
    .title-desc {
      color: #fff;
      font-size: 22px;
      border: 1px solid #fff;
      border-radius: 500px;
      padding: 2px 20px;
      margin-top: 10px;
      text-align: center;
      letter-spacing: 2px;
    }
  }
}
</style>
