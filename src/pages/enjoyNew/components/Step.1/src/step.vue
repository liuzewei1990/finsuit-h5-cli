<template>
  <div class="yd-step" :class="'yd-step-theme' + theme">
    <ul class="yd-step-content" :style="{paddingBottom: hasBottom ? '42px' : '10px', paddingTop: hasTop ? '42px' : '10px', color: currentColor}">
      <slot></slot>
    </ul>
  </div>
</template>

<script type="text/babel">

export default {
  data () {
    return {
      hasTop: false,
      hasBottom: false
    }
  },
  props: {
    theme: {
      validator (value) {
        return ['1', '2'].indexOf(value) > -1;
      },
      default: '1'
    },
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

        item.theme = this.theme;
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
    font-size: 26px;
    &-content {
      display: flex;
    }

    &-item {
      flex: 1;
      position: relative;
      &:not(:first-child):before {
        content: "";
        height: 4px;
        position: absolute;
        top: -2px;
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
        padding: 0 8px;
      }

      &-top-text > span {
        color: #989898;
      }

      &-bottom {
        color: #333;
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
      &:not(:first-child):before {
        width: 70%;
        left: -35%;
      }
      > em {
        width: 40px;
        height: 40px;
        margin-left: -20px;
        margin-top: -20px;
        text-align: center;
        line-height: 40px;
        font-size: 24px;
        > i {
          color: #fff;
        }
      }

      &-top {
        bottom: 36px;
      }

      &-bottom {
        top: 36px;
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
          color: currentColor;
        }
      }
    }
  }
}

.@{css-prefix}-step-theme2 {
  .@{css-prefix}-step {
    &-content {
      padding: 84px 0;
    }
    &-item {
      &:not(:first-child):before {
        width: 80%;
        left: -40%;
      }
      > em {
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
      }

      &-top {
        bottom: 30px;
      }

      &-bottom {
        top: 30px;
      }

      &-current {
        .@{css-prefix}-step-item-top {
          &-text {
            display: inline-block;
            background-color: currentColor;
            padding: 10px 22px 6px;
            border-radius: 200px;
            position: relative;
            z-index: 1;
            > span {
              color: #fff;
            }
          }
        }
        > em {
          background-color: currentColor;
          &:after {
            content: "";
            width: 0;
            height: 0;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 12px solid currentColor;
            position: absolute;
            top: -20px;
            left: 50%;
            margin-left: -12px;
          }
        }
      }
    }
  }
}
</style>
