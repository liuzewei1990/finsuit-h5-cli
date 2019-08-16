<template>
  <div class="main-banner">

    <!-- btn -->
    <div class="btn btn-rule" @click="$emit('onClickRule')" v-track:B000A123.click="()=>{}">
      <div class="btn-icon"></div>
      <span>规则</span>
    </div>

    <!-- btn -->
    <div class="btn btn-box" @click="$emit('onClickBox')" v-track:B000A125.click="()=>{}">
      <div class="btn-icon"></div>
      <span>我的奖品</span>
    </div>

    <!-- 分享按钮 -->
    <div class="share-hb share-animate" v-show="APP_FLAG === 'PC' || APP_FLAG === 'BC'" @click="$emit('onClickShare')" v-track:ACB0F002.click="()=>{}">
      <img src="./images/share.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      APP_FLAG: sessionStorage.getItem("APP_FLAG")
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.main-banner {
  height: 399px;
  background: url("./images/banner.png") no-repeat;
  background-size: cover;
  background-position: center;
}

.main-banner {
  position: relative;
  .btn {
    min-width: 100px;
    height: 40px;
    // line-height: 40px;
    background: #d1422b;
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
    background: #c52910;
  }

  .btn .btn-icon {
    width: 24px;
    height: 24px;
    margin: 0 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .btn span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-left: 1px;
  }

  .btn-rule {
    top: 78px;
    .btn-icon {
      background-image: url("./images/rule-icon.png");
    }
  }

  .btn-box {
    top: 19px;
    .btn-icon {
      background-image: url("./images/box-icon.png");
    }
  }

  .share-hb {
    position: fixed;
    right: 10px;
    width: 80px;
    bottom: 300px;
    z-index: 100;
    img {
      width: 100%;
    }
  }

  .share-animate {
    animation: shareBtn 0.8s linear infinite;
  }

  @keyframes shareBtn {
    0% {
      transform: rotate(20deg);
    }

    50% {
      transform: rotate(-20deg);
    }

    100% {
      transform: rotate(20deg);
    }
  }
}
</style>
