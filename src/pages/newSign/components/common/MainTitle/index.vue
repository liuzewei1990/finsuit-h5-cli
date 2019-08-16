<template>
  <div class="main-title">
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
}
</script>

<style lang="less" scoped>
.main-title {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 32px;
    color: #111;
    font-weight: 600;
    position: relative;
  }

  .title::after,
  .title::before {
    content: "";
    width: 30px;
    height: 8px;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.4;
    background: url("./title-bar.png") no-repeat;
    background-size: 100% 100%;
  }

  .title::after {
    left: -50px;
    transform: scaleX(-1);
  }

  .title::before {
    right: -50px;
  }
}
</style>
