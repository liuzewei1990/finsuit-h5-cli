<template>
  <div class="yd-timeline">
    <ul class="yd-timeline-content">
      <slot></slot>
    </ul>
  </div>
</template>

<script type="text/babel">
export default {
}
</script>

<style lang="less">
@css-prefix: yd;
@line-color: #ececec;
.@{css-prefix} {
  &-timeline {
    background-color: #fff;
    font-size: 26px;
    color: #6e6e6e;
    overflow: hidden;
    position: relative;
    z-index: 1;
    border-top: 1px solid @line-color;

    &-content {
      margin-left: 52px;
      border-left: 2px solid #3b6adc;
    }

    &-item,
    &-custom-item {
      padding: 32px 24px 32px 0;
      margin-left: 32px;
      position: relative;
      //   border-bottom: 1px solid @line-color;

      .@{css-prefix}-timeline-icon {
        content: "";
        position: absolute;
        z-index: 1;
        left: -32px;
        display: block;
        top: 38px;
        transform: translate(-50%, 0);
      }

      &:first-child {
        margin-top: 32px;
        padding-top: 0;
        // color: #000;
        > .@{css-prefix}-timeline-icon {
          top: 6px;
        }
      }

      &:last-child:before {
        content: "";
        width: 2px;
        height: 100%;
        background-color: #fff;
        position: absolute;
        left: -34px;
        top: 38px;
      }
    }

    &-item {
      .@{css-prefix}-timeline-icon {
        width: 20px;
        height: 20px;
        border-radius: 200px;
        background-color: #fff;
        border: 3px solid #3b6adc;
        box-shadow: 0 0 0 6px #fff;
      }
      &:first-child {
        > .@{css-prefix}-timeline-icon {
          background-color: #f23030;
          width: 25px;
          height: 25px;
        }
        // &:before {
        //   content: "";
        //   width: 32px;
        //   height: 32px;
        //   position: absolute;
        //   z-index: 0;
        //   top: 0;
        //   left: -48px;
        //   background-color: #fbbfbf;
        //   border-radius: 200px;
        // }
      }
    }

    &-custom-item {
      &:first-child > .@{css-prefix}-timeline-icon {
        // top: 0;
      }
    }
  }
}
</style>
