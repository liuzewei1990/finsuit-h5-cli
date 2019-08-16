<template>
  <div id="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- 分享模块 -->
    <share-popup ref="sharePopup"></share-popup>
    <!-- 分享图片专用 -->
    <share-image ref="shareImage"></share-image>
  </div>
</template>

<script>
import bus from "@onTopic/utils/bus.js"
import SharePopup from "./view/main/modules/sharePopup"
const ShareImage = () => import(/* webpackChunkName: "module-share-image" */ "@onTopic/view/main/modules/shareImage");
export default {
  components: { SharePopup, ShareImage },
  mounted () {
    this.initEvent();
  },
  methods: {
    initEvent () {
      //打开分享弹窗
      bus.$on("openSharePopup", () => {
        this.$refs["sharePopup"].open();
      })

      // 打开分享图片类型弹窗
      bus.$on("openShareImage", (options) => {
        this.$refs["shareImage"].open(options);
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
