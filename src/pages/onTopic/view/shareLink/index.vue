<template>
  <div id="page" class="share-link-page" :class="{'share-link-page-padding share-link-page-height':!isShare}">
    <!-- 每日一题 -->
    <one-topic :isShare="isShare"></one-topic>
    <!-- 开户有奖 -->
    <module-account :isShare="isShare"></module-account>
    <!-- 分享二维码 -->
    <qrcode v-if="isShare"></qrcode>
  </div>
</template>

<script>

import OneTopic from "./modules/oneTopic"
import ModuleAccount from "./modules/account"
import Qrcode from "./modules/qrcode"
export default {
  props: ["isShare"],
  components: { ModuleAccount, OneTopic, Qrcode },
  mounted () {
    if (this.isShare !== true) {
      // 站外-分享落地页面 埋点
      this.$trackEvents.ACB0I011();
    }
  }
}
</script>

<style lang="less" scoped>
.share-link-page {
  background: linear-gradient(to bottom right, #3866ff 70%, #2e83ef 90%);
  overflow: hidden;
}
.share-link-page-padding {
  padding-bottom: 50px;
}

.share-link-page-height {
  min-height: 100vh;
}
</style>
