<template>
  <div class="main-title">
    <div class="title" :style="`color:${color}`" @click="$emit('iconClick')">{{title}}<i class="icon" v-if="isIcon"></i></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    color: {
      type: String,
      default: "#111"
    },
    isIcon: {
      type: Boolean,
      default: false
    }
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
    display: flex;
    align-items: center;

    .icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("./icon.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 10px;
    }
  }

  .title::after,
  .title::before {
    content: "";
    width: 56px;
    height: 32px;
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
    left: -80px;
    transform: scaleX(-1);
  }

  .title::before {
    right: -80px;
  }
}
</style>
