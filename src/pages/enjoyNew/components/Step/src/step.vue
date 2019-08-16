<template>
  <div class="yd-step yd-step-theme1">
    <ul class="yd-step-content" :style="{paddingBottom: hasBottom ? '32px' : '10px', paddingTop: hasTop ? '32px' : '10px', color: currentColor}">
      <slot></slot>
    </ul>
  </div>
</template>

<script type="text/babel">

export default {
  name: 'yd-step',
  data () {
    return {
      hasTop: false,
      hasBottom: false
    }
  },
  props: {
    current: {
      validator (val) {
        return /^\d*$/.test(val);
      },
      default: 0
    },
    currentColor: {
      default: '#0DB78A'
    }
  },
  methods: {
    updateChildStatus (reinit) {
      const childrens = this.$children.filter(item => item.$options.name === 'yd-step-item');
      childrens.forEach((item, key) => {
        item.stepNumber = key + 1;
        if (key + 1 === childrens.length && this.current >= item.stepNumber) {
          item.current = item.stepNumber;
        } else {
          item.current = this.current;
        }

        if (!!item.$slots.bottom) {
          this.hasBottom = true;
        }
        if (!!item.$slots.top) {
          this.hasTop = true;
        }
        if (!item.loaded || reinit) {
          item.setCurrentClass();
          item.loaded = true;
        }
      });
    }
  },
  watch: {
    current () {
      this.$nextTick(() => {
        this.updateChildStatus(true);
      });
    }
  }
}
</script>

<style lang="less">
@css-prefix: yd;

.@{css-prefix} {
  &-step {
    &-content {
      display: flex;
    }

    &-item {
      //   border: 1px solid red;
      //   height: 20px;
      flex: 1;
      position: relative;
      &::before {
        content: "";
        height: 2px;
        position: absolute;
        top: -0.1px;
        background-color: #ccc;
      }
      > em {
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: #ccc;
      }

      &-top,
      &-bottom {
        position: absolute;
        left: 0;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        // padding: 0 8px;
      }

      &-top-text > span {
        color: #999999;
        font-size: 26px;
      }

      &-bottom {
        color: #333333;
        font-size: 22px;
      }
    }

    /* 调整是为了让圆点靠边对齐 */

    &-item:first-child {
      //   width: 10px;
      flex: 1;
      > em {
        left: 0;
      }
      .yd-step-item-top,
      .yd-step-item-bottom {
        text-align: left !important;
      }
      &::before {
        display: none;
      }
    }

    &-item:last-child {
      //   width: 10px;
      flex: 1;
      > em {
        left: 100%;
      }
      .yd-step-item-top,
      .yd-step-item-bottom {
        text-align: right !important;
      }
      &::before {
        display: none;
      }
    }
  }
}

.@{css-prefix}-step-theme1 {
  .@{css-prefix}-step {
    &-content {
      padding: 20px 0 84px 0;
    }

    &-item {
      &::before {
        width: 300%;
        left: -100%;
      }
      > em {
        width: 12px;
        height: 12px;
        border: 5px solid #fff;
        margin-left: -11px;
        margin-top: -11px;
        text-align: center;
        font-size: 24px;
        z-index: 99;
        > i {
          color: #fff;
        }
      }

      &-top {
        bottom: 26px;
      }

      &-bottom {
        top: 26px;
      }

      &-current {
        &:before {
          background-color: currentColor;
        }

        > em {
          background-color: currentColor;
          &.@{css-prefix}-step-checkmark:after {
            content: "";
            position: absolute;
            top: 8px;
            left: 16px;
            border: 1px solid #fff;
            border-top: 0;
            border-left: 0;
            transform: rotate(45deg);
            width: 10px;
            height: 20px;
          }
        }

        .@{css-prefix}-step-item-bottom {
          //   color: currentColor;
        }
      }
    }
  }
}
</style>
