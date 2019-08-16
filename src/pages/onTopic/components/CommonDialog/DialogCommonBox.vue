<template>
  <div class="dialog-common-box bounceIn">
    <div class="dialog-common-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.dialog-common-box {
  //   perspective: 1000px;
  position: relative;
  .dialog-common-content {
    width: 644px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    // transform-style: preserve-3d;
    // transform: rotateX(10deg) translateZ(0);
  }
  &::after,
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
    z-index: -2;
  }
  &::after {
    width: 98%;
    bottom: -10px;
    background: #e2edff;
  }
  &::before {
    width: 94%;
    bottom: -20px;
    background: #c2d4ef;
  }
}
</style>
