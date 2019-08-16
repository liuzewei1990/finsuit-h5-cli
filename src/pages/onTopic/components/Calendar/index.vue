<template>
  <div class="calendar">
    <div class="calendar-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.calendar {
  .calendar-container {
    margin: -0px auto 30px;
    width: 90%;
    min-height: 356px;
    background: #fff;
    position: relative;
    border-radius: 3px 3px 10px 10px;
    padding: 20px 0 0;
    box-sizing: border-box;
    // z-index: 1;

    // 画册倒影
    &::after {
      content: "";
      display: block;
      width: 95%;
      min-height: 85%;
      background: #d2e1ff;
      border-radius: 3px 3px 10px 10px;
      transform: skewX(-2deg);
      position: absolute;
      left: -8px;
      top: 10px;
      z-index: -1;
    }

    // 画册齿轮
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 46px;
      position: absolute;
      top: -23px;
      left: 0;
      background: url("./topic-icon.png");
      background-size: contain;
      z-index: 1;
    }
  }
}
</style>
