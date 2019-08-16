<template>
  <div id="page" class="main">
    <msg-scroll></msg-scroll>
    <!-- 首页banner -->
    <main-banner></main-banner>
    <div class="main-modules">

      <!-- 我的专享体验金 -->
      <enjoy-money></enjoy-money>

      <!-- 我的专享福利List -->
      <enjoy-list></enjoy-list>

      <!-- 专享产品 -->
      <enjoy-producd></enjoy-producd>

    </div>
    <!-- 页脚 -->
    <main-footer></main-footer>

  </div>
</template>

<script> 
import ContentBox from "@enjoyNew/components/ContentBox/index.vue"
import MainBanner from "@enjoyNew/view/main/modules/mainBanner.vue"
import MainFooter from "@enjoyNew/view/main/modules/mainFooter.vue"
import EnjoyMoney from "@enjoyNew/view/main/modules/enjoyMoney.vue"
import EnjoyList from "@enjoyNew/view/main/modules/enjoyList.vue"
import EnjoyProducd from "@enjoyNew/view/main/modules/enjoyProducd.vue"
import MsgScroll from "@enjoyNew/view/main/modules/msgScroll.vue"

export default {
  components: { ContentBox, MainBanner, MainFooter, EnjoyMoney, EnjoyList, EnjoyProducd, MsgScroll },
  mounted () {
    // 处理小程序中活动首页浏览器的返回 - 判定只要是实名认证过来的的页面，让其返回小程序首页
    if (this.$store.state.APP_FLAG === "PMP") {
      this.handleBrowserReturn();
    }
  },
  methods: {
    // 处理活动首页浏览器返回，当实名红包 - 实名认证 - 成功后跳到活动首页时，让其返回小程序首页
    handleBrowserReturn () {
      if (this.$route.query["isAuthReturn"] === "true") {
        window.history.pushState(null, null);
        window.addEventListener("popstate", () => {
          wx.miniProgram.switchTab({
            url: "/pages/index/index"
          })
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  //   background: #ff7740;
  background: url("../../assets/images/main-bg.png");
  background-size: contain;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main-modules {
    flex: 1;
  }
}
</style>
