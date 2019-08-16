<template>
  <div class="weui-wepay-flow" :class="{'weui-wepay-flow_vertical': orientation === 
  'vertical'}">
    <div class="weui-wepay-flow__bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flow',
  props: {
    orientation: {
      type: String,
      default: 'horizontal'
    }
  }
}
</script>

<style lang="less">
@bubbleCorlor: #ff8a00;
.setBubbleCommon(@height,@backgroundColor,@fontSize,@color,@borderRadius) {
  height: @height;
  line-height: @height;
  background-color: @backgroundColor;
  font-size: @fontSize;
  color: @color;
  white-space: nowrap;
  padding: 0 12px;
  position: relative;
  border-radius: @borderRadius;
  &:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0;
    position: absolute;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = top) {
  &:after {
    border-color: @backgroundColor transparent transparent transparent;
    border-style: solid;
    border-width: 10px 6px;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -20px;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = bottom) {
  &:after {
    border-color: transparent transparent @backgroundColor transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px 6px;
    left: 50%;
    transform: translate(-50%, 0);
    top: -20px;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = left) {
  &:after {
    border-color: transparent transparent transparent @backgroundColor;
    border-style: solid;
    border-width: 6px 10px;
    top: 50%;
    transform: translate(0, -50%);
    right: -20px;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = right) {
  &:after {
    border-color: transparent @backgroundColor transparent transparent;
    border-style: solid;
    border-width: 6px 10px;
    top: 50%;
    transform: translate(0, -50%);
    left: -20px;
  }
}
.weui-wepay-flow,
.weui-wepay-flow-auto {
  padding: 40px;
}
.weui-wepay-flow__bd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.weui-wepay-flow__li {
  width: 28px;
  height: 28px;
  position: relative;
  z-index: 1;
  .weui-wepay-flow__state {
    position: absolute;
    left: 0;
    top: 0;
    width: 28px;
    height: 28px;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: #fff;
    border-radius: 14px;
    box-sizing: border-box;
  }
}
.weui-wepay-flow__state {
  background-color: #e2e2e2;
  .weui-wepay-flow__li_done & {
    background-color: #09bb07;
  }
}
[class^="weui-wepay-flow__title-"],
[class*=" weui-wepay-flow__title-"] {
  position: absolute;
  color: #999999;
  font-size: 28px;
  font-weight: normal;
  white-space: nowrap;
  text-align: center;
}
.weui-wepay-flow__title-top {
  bottom: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  .weui-wepay-flow__li_done & {
    color: #333;
  }
}
.weui-wepay-flow__title-bottom {
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  .weui-wepay-flow__li_done & {
    color: #333;
  }
}
.weui-wepay-flow__title-left {
  right: 60px;
  top: 50%;
  transform: translate(0, -50%);
  .weui-wepay-flow__li_done & {
    color: #333;
  }
  text-align: right;
}
.weui-wepay-flow__title-right {
  left: 60px;
  top: 50%;
  transform: translate(0, -50%);
  text-align: left;
  .weui-wepay-flow__li_done & {
    color: #333;
  }
}
[class^="weui-wepay-flow__intro-"],
[class*=" weui-wepay-flow__intro-"] {
  .setBubbleCommon(40px, @bubbleCorlor, 20px, #fff, 8px);
}
.weui-wepay-flow__intro-top {
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  .setBubblePrivate(top, @bubbleCorlor);
  position: absolute;
}
.weui-wepay-flow__intro-bottom {
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  .setBubblePrivate(bottom, @bubbleCorlor);
  position: absolute;
}
.weui-wepay-flow__intro-right {
  left: 72px;
  top: 50%;
  transform: translate(0, -50%);
  .setBubblePrivate(right, @bubbleCorlor);
  position: absolute;
}
.weui-wepay-flow__intro-left {
  right: 72px;
  top: 50%;
  transform: translate(0, -50%);
  .setBubblePrivate(left, @bubbleCorlor);
  position: absolute;
}

[class^="weui-wepay-flow__info-"] {
  .setBubbleCommon(28px, #09bb07, 20px, #fff, 4px);
  position: absolute;
  .weui-wepay-flow__line_ing & {
    display: block;
  }
}
.weui-wepay-flow__info-top {
  display: none;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 22px;
  .weui-wepay-flow__line_ing & {
    display: block;
  }
  .setBubblePrivate(top, #09bb07);
}
.weui-wepay-flow__info-bottom {
  display: none;
  left: 50%;
  transform: translate(-50%, 0);
  top: 22px;
  .weui-wepay-flow__line_ing & {
    display: block;
  }
  .setBubblePrivate(bottom, #09bb07);
}
.weui-wepay-flow__info-left {
  display: none;
  top: 50%;
  transform: translate(0, -50%);
  right: 24px;
  .weui-wepay-flow__line_ing & {
    display: block;
  }
  .setBubblePrivate(left, #09bb07);
}
.weui-wepay-flow__info-right {
  display: none;
  top: 50%;
  transform: translate(0, -50%);
  left: 24px;
  .weui-wepay-flow__line_ing & {
    display: block;
  }
  .setBubblePrivate(right, #09bb07);
}
.weui-wepay-flow__line {
  flex: 1;
  background-color: #e2e2e2;
  height: 6px;
  position: relative;
}
.weui-wepay-flow__title {
  color: #999999;
  font-size: 28px;
  font-weight: normal;
}
.weui-wepay-flow__info {
  color: #999999;
  font-size: 24px;
}
.weui-wepay-flow__process {
  display: none;
  background-color: #09bb07;
  height: 6px;
  position: relative;
  .weui-wepay-flow__line_ing & {
    display: block;
    width: 50%;
  }
  .weui-wepay-flow__line_done & {
    display: block;
  }
}
.weui-wepay-flow_custom {
  .weui-wepay-flow__bd {
    justify-content: flex-start;
  }
  .weui-wepay-flow__line {
    flex: none;
    width: 200px;
  }
}
.weui-wepay-flow_vertical {
  .weui-wepay-flow__bd {
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }
  .weui-wepay-flow__line {
    height: auto;
    width: 6px;
  }
  .weui-wepay-flow__line_ing {
    .weui-wepay-flow__process {
      height: 50%;
    }
  }
  .weui-wepay-flow__process {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 6px;
  }
  .weui-wepay-flow__line_done {
    .weui-wepay-flow__process {
      height: 100%;
    }
  }
}

.weui-wepay-flow_vertical-custom {
  .weui-wepay-flow__bd {
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }
  .weui-wepay-flow__line {
    width: 6px;
    flex: none;
  }
  .weui-wepay-flow__line_ing {
    .weui-wepay-flow__process {
      height: 50%;
    }
  }
  .weui-wepay-flow__process {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 6px;
  }
  .weui-wepay-flow__line_done {
    .weui-wepay-flow__process {
      height: 100%;
    }
  }
}
.weui-wepay-flow-auto {
  position: relative;
}
.weui-wepay-flow-auto__bd {
  position: relative;
}
.weui-wepay-flow-auto__state {
  position: absolute;
  left: 0;
  top: 8px;
  width: 28px;
  height: 28px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: #fff;
  border-radius: 14px;
  background-color: #e2e2e2;
  z-index: 2;
}
.weui-wepay-flow-auto__state_on {
  background-color: #09bb07;
}
.weui-wepay-flow-auto__line {
  position: absolute;
  z-index: 1;
  width: 4px;
  background-color: #dddddd;
  top: 20px;
  bottom: -8px;
  left: 12px;
  z-index: 1;
}
.weui-wepay-flow-auto__line_on {
  background-color: #09bb07;
}
.weui-wepay-flow-auto__li {
  position: relative;
  padding-bottom: 40px;
  padding-left: 60px;
}
.weui-wepay-flow-auto__title {
  color: #999999;
  font-size: 28px;
  font-weight: normal;
}
.weui-wepay-flow-auto__info {
  color: #999999;
  font-size: 24px;
}
</style>