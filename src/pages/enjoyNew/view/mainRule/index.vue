<template>
  <div id="page" class="enjoy-rule">
    <div class="enjoy-rule-bj">
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ""
    }
  },
  created () {
    this.renderData();
  },
  methods: {
    async renderData () {
      let params = { ACTIVITY_CODE: this.$Config.actityCode };
      let data = await this.$api.getEnjoyRule(params);
      console.debug("this.$api.getEnjoyRule", data);
      if (this.$utils.isObject(data)) {
        this.content = data.RULE_CONTENT;
      } else {
        this.$Toast("this.$api.getEnjoyRule data error");
      }
    }
  }
}
</script>

<style lang="less" scoped>
.enjoy-rule,
.enjoy-rule-bj {
  font-size: 30px;
  overflow: hidden;
  color: #333;
  text-align: justify;
  padding-bottom: 20px;
  min-height: 100vh;
}

.enjoy-rule {
  background: -webkit-linear-gradient(
    to bottom,
    #ff4f34,
    #ff8234
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    to bottom,
    #ff4f34,
    #ff8234
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    to bottom,
    #ff4f34,
    #ff8234
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to bottom,
    #ff4f34,
    #ff8234
  ); /* 标准的语法（必须放在最后） */
}

.enjoy-rule-bj {
  background: url("../../assets/images/rule-head.png") no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  box-sizing: border-box;
  .content {
    padding: 30px;
    box-sizing: border-box;
    width: 694px;
    // margin-top: 100px;
    background: #ffe5bc;
    border-radius: 20px;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 694px;
      height: 55px;
      background: url("../../assets/images/rule-top.png") no-repeat;
      background-size: contain;
      position: absolute;
      left: 0;
      top: -45px;
    }
  }
}
</style>
