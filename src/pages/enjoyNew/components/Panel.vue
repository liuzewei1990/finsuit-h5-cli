<template>
  <div class="bc-panel">
    <div class="bc-panel-header">{{title}}</div>
    <div class="bc-panel-main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"]
}
</script>

<style lang="less" scoped>
.bc-panel {
  width: 694px;
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 8px 15px 1px #e8e8e8;

  .bc-panel-header {
    height: 90px;
    line-height: 90px;
    font-size: 30px;
    border-bottom: 1px solid #e6e6e6;
  }
  .bc-panel-main {
    padding: 30px 0;
    box-sizing: border-box;
    color: #999999;
    font-size: 28px;
  }
}
</style>
 