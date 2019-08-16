<template>
  <div class="main-banner">
    <!-- 拼财title -->
    <template v-if="$store.state.APP_FLAG === 'PC' || $store.state.APP_FLAG === 'PMP'">
      <img class="title" :src="require('@enjoyNew/assets/images/banner-title-pc.png')" alt="">
    </template>
    <!-- 比财title -->
    <template v-else>
      <img class="title" :src="require('@enjoyNew/assets/images/banner-title-bc.png')" alt="">
    </template>

    <div class="btn btn-rule" @click="$router.push('/mainRule')" v-track:ACB0L002.click="()=>{}">
      <span>活动规则</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.main-banner {
  width: 750px;
  height: 694px;
  background: url("../../../assets/images/banner.png") no-repeat;
  background-size: 100%;
  position: relative;

  .title {
    width: 591px;
    display: block;
    margin: 90px auto 0;
  }

  .btn {
    min-width: 130px;
    height: 40px;
    background: #fb401f;
    border-top-left-radius: 500px;
    border-bottom-left-radius: 500px;
    position: absolute;
    right: 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
  }

  .btn:hover {
    background: #fc583b;
  }

  .btn span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-left: 1px;
  }

  .btn-rule {
    top: 60px;
  }
}
</style>
