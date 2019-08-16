<template>
  <div class="module-box" :class="{'link-icon':linkIcon}">
    <div class="content-box">
      <div class="content-box-bar"></div>
      <div class="content-box-bg">
        <div class="content-box-title">
          <h3>{{title}}</h3>
        </div>
        <div class="content-box-main">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "linkIcon"]
}
</script>

<style lang="less" scoped>
.content-box {
  width: 694px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  &-bar {
    width: 694px;
    height: 63px;
    background: url("./top.png") no-repeat;
    background-size: 100% 100%;
  }
  &-title {
    display: flex;
    align-items: center;
  }
  &-title h3 {
    display: inline-block;
    margin: 0 auto;
    font-size: 38px;
    color: #e54106;
    position: relative;

    &::after,
    &::before {
      content: "";
      width: 86px;
      height: 26px;
      background: url("./title.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    &::after {
      left: -138px;
      transform: scaleX(-1);
    }

    &::before {
      right: -138px;
    }
  }

  &-bg {
    background: #ffe5bc;
  }

  &-main {
    padding: 20px;
    box-sizing: border-box;
  }
}

.link-icon {
  position: relative;
  &::before,
  &::after {
    content: "";
    display: block;
    width: 30px;
    height: 44px;
    background: url("./link-icon.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: -30px;
  }
  &::before {
    left: 94px;
  }
  &::after {
    left: 605px;
  }
}
</style>
