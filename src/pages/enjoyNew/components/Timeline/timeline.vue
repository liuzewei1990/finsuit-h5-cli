<template>
  <div class="vux-timeline">
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    color: String,
    isShowIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setChildProps () {
      if (!this.$children) return
      const len = this.$children.length
      this.$children.forEach((child, index) => {
        child.isLast = index === len - 1
        child.isFirst = index === 0
      })
    }
  }
}
</script>

<style lang="less">
.vux-timeline {
  padding: 1rem;
}

.vux-timeline > ul > li {
  list-style: none;
}

@vux-timeline: ~"vux-timeline";

.@{vux-timeline} {
  &-item {
    position: relative;
  }

  &-item-content {
    padding: 0 0 1.5rem 1.2rem;
  }

  &-item-head,
  &-item-head-first {
    position: absolute;
    content: "";
    z-index: 99;
    border-radius: 200px;
  }

  &-item-head {
    width: 20px;
    height: 20px;
    left: 2px;
    top: 8px;
  }

  &-item-head-first {
    width: 40px;
    height: 40px;
    left: -8px;
    top: 10px;
  }

  &-item-tail {
    position: absolute;
    content: "";
    height: 100%;
    width: 4px;
    left: 10px;
    top: 10px;
    background-color: #3b6adc;
  }

  &-item-checked {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;

    &.weui-icon-success-no-circle::before {
      font-size: 28px;
      position: absolute;
      left: 6px;
      top: 6px;
      margin: 0 !important;
      color: #fff;
    }
  }
}

.vux-timeline-item-color {
  background-color: #3b6adc;
}
</style>
