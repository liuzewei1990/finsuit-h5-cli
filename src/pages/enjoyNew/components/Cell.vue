<template>
  <div class='x-cell' :class="{'border-1px':borderLine,'top-line':topLine}">
    <slot name="icon"></slot>
    <div class='title'>{{title}}</div>
    <div class='desc' :class="{'mr-l':isLink}" v-if="desc">{{desc}}</div>
    <slot name="desc"></slot>
    <img v-if="isLink" class='link-icon' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAMAAAAootjDAAAAPFBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZlr8OySAAAAE3RSTlMABA2nfQeel5GKr4R1FLppzsxxRm9JNQAAAFhJREFUKM+l0UsOgDAIBFBa7Qdbv3P/u7pwByQ1heXLkBCGHHNzkFRQpYWKYlmSxjpHjKxyDUv8YbQ6rGPbpZ04xvSoxW5JVCdMSEPWksRTx0JGGddXo39eigoD2cYeb8gAAAAASUVORK5CYII=' alt="">
  </div>
</template>

<script>
export default {
  props: [
    "title",
    "desc",
    "isLink",
    "borderLine",
    "topLine",
    "to",
  ]
}
</script>

<style lang="less" scoped>
.x-cell {
  position: relative;
  display: flex;
  background-color: #fff;
  padding: 14px 0%;
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  font-size: 28px;

  .title {
    flex: 1.2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    //   font-size: 16px;
  }

  .desc {
    //   font-size: 24px;
    color: #aaa;
    //   flex: 0.8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: right;
    /* display: table-cell;  */
    /* line-height: 30rpx;  */
    /* vertical-align:middle; */
  }

  .link-icon {
    width: 20px;
    height: 34px;
    margin-left: 6px;
  }

  .mr-l {
    margin-right: 40px;
  }
}
.border-1px {
  border-bottom: 1px solid #e3e5e9;
}

.top-line {
  border-top: 1px solid #e3e5e9;
}
</style>
