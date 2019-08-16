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
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.4;
  }

  .title::after {
    left: -50px;
    background: linear-gradient(bottom left, #fff, #f46c56);
  }

  .title::before {
    right: -50px;
    background: linear-gradient(bottom right, #fff, #f46c56);
  }
}
</style>
