<template>
  <div id="page" class="main-page" ref="main-page">
    <!-- 每日一题 -->
    <one-topic></one-topic>
    <!-- 开户有奖 -->
    <module-account />
    <!-- 精选产品 -->
    <module-goods-up />
    <!-- 精彩活动 -->
    <module-market />
  </div>
</template>

<script>

import OneTopic from "./modules/oneTopic"
import ModuleAccount from "./modules/account"
const ModuleGoodsUp = () => import(/* webpackChunkName: "module-goods-up" */ "./modules/goodsUp");
const ModuleMarket = () => import(/* webpackChunkName: "module-market" */ "./modules/market");

export default {
  components: { OneTopic, ModuleAccount, ModuleGoodsUp, ModuleMarket }
}
</script>

<style lang="less" scoped>
</style>
