<template>
  <mask-box v-model="maskBox" :show-loading="false" :isTransparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <div class="box bounceIn">
      <div class="content">
        已连续到<span>{{signNums}}</span>天，赶紧去抽奖吧！
      </div>
    </div>
  </mask-box>
</template>

<script>
import MaskBox from "@newSign/components/common/MaskBox.vue"
export default {
  components: { MaskBox },
  data () {
    return {
      maskBox: false,
      // 签到次数
      signNums: 0
    }
  },
  methods: {
    open (signNums) {
      this.maskBox = true;
      this.signNums = signNums;
    },

    close () {
      this.maskBox = false;
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 591px;
  height: 578px;
  background: url("./images/sign.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  margin-top: 100px;
}

.content {
  width: 412px;
  height: 441px;
  margin: 468px auto 0;
  color: #f9fff2;
  text-align: center;
  font-size: 28px;
}
</style>
