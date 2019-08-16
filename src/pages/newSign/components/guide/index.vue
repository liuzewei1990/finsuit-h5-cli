<template>
  <div class="share">
    <div class="share-con-top">
      <img src="./images/tuceng16@2x.jpg" alt="">
      <img class="buv-lod" @click="$emit('onShareBtn')" src="./images/btv@2x.png" alt="">
    </div>
    <div class="share-con-bot">
      <div class="bot-title">
        <h1>比财</h1>
        <h5 class="tex-center">携手多家银行打造开放式金融产品比价平台</h5>

        <div class="bot-list">
          <img class="list-left" src="./images/lcaq@2x.png" alt="">
          <div class="list-right">
            <h2>理财<span style="color:rgb(70,199,0)">安全</span></h2>
            <h5>精选安全靠谱的理财机构，钱有关的事银行干</h5>
          </div>
        </div>

        <div class="bot-list">
          <img class="list-left" src="./images/sydx@2x.png" alt="">
          <div class="list-right">
            <h2>收益<span style="color:rgb(228,0,123)">动心</span></h2>
            <h5>携手多家银行打造开放式金融产品比价平台</h5>
          </div>
        </div>

        <div class="bot-list">
          <img class="list-left" src="./images/glbj@2x.png" alt="">
          <div class="list-right">
            <h2>管理<span style="color:rgb(255,234,0)">便捷</span></h2>
            <h5>携手多家银行打造开放式金融产品比价平台</h5>
          </div>
        </div>
        <!-- <a href="wxef65663cc5c251f3://finsuit" style="font-size:50px">打开</a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {

  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.share {
  .tex-center {
    text-align: center;
  }
  .share-con-top {
    img {
      width: 100%;
    }
    .buv-lod {
      position: absolute;
      top: 1130px;
      width: 236px;
      height: 54px;
      left: 50%;
      margin-left: -118px;
    }
  }
  .share-con-bot {
    padding: 46px 50px 100px 50px;
    h1 {
      font-size: 46px;
      font-weight: bold;
      text-align: center;
      color: rgb(102, 102, 102);
      letter-spacing: 4px;
    }
    h2 {
      font-size: 36px;
      color: rgb(102, 102, 102);
      font-weight: bold;
      letter-spacing: 4px;
    }
    h5 {
      font-size: 22px;
      color: rgb(102, 102, 102);
      line-height: 22px;
    }
    .bot-list {
      margin-top: 46px;
      .list-left {
        width: 80px;
        height: 80px;
        float: left;
        margin-right: 30px;
      }
      .list-right {
        padding-top: 2px;
      }
    }
  }
}
</style>
