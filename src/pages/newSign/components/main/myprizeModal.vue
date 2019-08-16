<template>
  <mask-box v-model="maskBox" :show-loading="false" :isTransparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <div class="box">
      <div class="content dev">
        <p class="content-title ellipsis dev">{{prize.title}}</p>
        <div class="content-img dev" :style="{backgroundImage:`url(${prize.img})`}"></div>

        <div class="content-block">
          <p class="content-tip dev">请联系客服领取奖励</p>
          <p v-copy="wx" v-copy:callback="copyText" class="content-wx dev">客服微信：{{wx}} <i>复制</i></p>
        </div>
      </div>
    </div>
  </mask-box>
</template>

<script>
import MaskBox from "@newSign/components/common/MaskBox.vue"
import { copy } from "@newSign/utils/directives/v-copy.js"
export default {
  components: { MaskBox },
  directives: {
    copy
  },
  data () {
    return {
      maskBox: false,
      // 奖品信息
      prize: {
        title: "",
        img: ""
      },
      wx: "bicaikefu" // 客服微信号 用来复制
    }
  },
  methods: {

    // 待发放奖品 打开弹窗查看状态
    open (data) {
      this.maskBox = true;
      this.prize["title"] = data.PRIZE_NAME;
      this.prize["img"] = this.$Config.aliyuncHost + data.PRIZE_FRONT_IMG;
    },

    // 复制客服微信号
    copyText (text) {
      this.$Toast("复制成功")
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 658px;
  height: 771px;
  background: url("./images/my-prize-bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  margin-top: 100px;
}

.content {
  width: 412px;
  // height: 441px;

  margin: 220px auto 0;
  color: #f9fff2;
  text-align: center;
  font-size: 28px;
}

.content-title {
  font-size: 30px;
  height: 40px;
}

.content-img {
  display: block;
  width: 251px;
  height: 161px;
  margin: 38px auto 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom;
  background-color: #fff;
  border-radius: 10px;
}

.content-block {
  margin-top: 80px;
  overflow: hidden;
}

.content-tip {
  font-size: 24px;
}

.content-wx {
  font-size: 24px;
  margin-top: 10px;
  i {
    display: inline-block;
    width: 76px;
    height: 36px;
    border-radius: 18px;
    line-height: 36px;
    background: #fff;
    color: #c52814;
    font-size: 22px;
    margin-left: 10px;
  }
}

.hidden-ipt {
  position: absolute;
  left: 0;
  top: -1000px;
  opacity: 0;
  z-index: -1;
}
</style>
