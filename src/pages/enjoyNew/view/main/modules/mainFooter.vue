<template>
  <div class="main-footer">
    <p>本活动最终解释权归比财所有</p>
    <p v-copy="wx" v-copy:callback="copyText">有问题可添加客服微信：{{wx}}</p>
  </div>
</template>

<script>

import { copy } from "@enjoyNew/utils/directives/v-copy.js"
export default {
  data () {
    return {
      wx: "bicaikefu"
    }
  },
  directives: { copy },
  methods: {
    // 复制客服微信号
    copyText (text) {
      this.$Toast("微信号复制成功")
    }
  }
}
</script>

<style lang="less" scoped>
.main-footer {
  font-size: 24px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  margin: 48px 0 104px;
}
</style>
