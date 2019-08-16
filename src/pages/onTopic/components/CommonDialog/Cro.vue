<template>
  <div class="cro-box">
    <div class="cro">
      <slot></slot>
      <div class="cro_left_top"></div>
      <div class="cro_right_top"></div>
      <div class="cro_left_bottom"></div>
      <div class="cro_right_bottom"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.cro-box {
  background: #fff2f0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.cro {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  border: 2px solid #ffd2cc;
  flex: 1;
  .cro_left_top,
  .cro_right_top,
  .cro_left_bottom,
  .cro_right_bottom {
    position: absolute;

    width: 10px;

    height: 10px;

    border: 2px solid #fff2f0;

    z-index: 1;

    background: #fff2f0;
  }

  .cro_left_top {
    top: -2px;

    left: -2px;

    border-radius: 0px 0px 20px 0px;

    border-bottom: 2px solid #ffd2cc;

    border-right: 2px solid #ffd2cc;
  }

  .cro_right_top {
    top: -2px;

    right: -2px;

    border-radius: 0px 0px 0px 20px;

    border-bottom: 2px solid #ffd2cc;

    border-left: 2px solid #ffd2cc;
  }

  .cro_left_bottom {
    left: -2px;

    bottom: -2px;

    border-radius: 0px 20px 0px 0px;

    border-top: 2px solid #ffd2cc;

    border-right: 2px solid #ffd2cc;
  }

  .cro_right_bottom {
    right: -2px;

    bottom: -2px;

    border-radius: 20px 0px 0px 0px;

    border-top: 2px solid #ffd2cc;

    border-left: 2px solid #ffd2cc;
  }
}
</style>
