<template>
  <!-- 答案解析 -->
  <div class="ellipsis-text-box" @click="handleClick">
    <!-- 正本 -->
    <p class="ellipsis-text" ref="ellipsis-text" :class="[{'ellipsis-text-is-hidden':topicDescIsHidden},`ellipsis-text-clamp-${clamp}`]" v-html="text">
      <!-- <span v-html="text"></span> -->
    </p>
    <!-- 副本 -->
    <p class="ellipsis-text ellipsis-text-bit ellipsis-text-is-hidden" ref="ellipsis-text-bit" :class="`ellipsis-text-clamp-${clamp}`" v-html="text">
      <!-- <span v-html="text"></span> -->
    </p>
    <!-- 展开按钮 -->
    <i class="ellipsis-text-icon" v-show="isShowEllipsisTextBtn" :style="{transform:`rotate(${this.n*180}deg)`,webkitTransform:`rotate(${this.n*180}deg)`}"></i>
  </div>

</template>

<script>
export default {
  props: {
    text: String,
    clamp: {
      type: String,
      default: "1"
    }
  },
  mounted () {
    //   + 5 是容误差
    if (this.$refs["ellipsis-text"].clientHeight > this.$refs["ellipsis-text-bit"].clientHeight + 5) {
      this.isShowEllipsisTextBtn = true;
      this.topicDescIsHidden = true;
    }
  },
  data () {
    return {
      // 默认不隐藏
      topicDescIsHidden: false,
      isShowEllipsisTextBtn: false,
      n: 0
    }
  },

  methods: {
    handleClick () {
      this.topicDescIsHidden = !this.topicDescIsHidden;
      this.n++;
      console.log();

    }
  }
}
</script>

<style>
.ellipsis-text * {
  display: inline;
}
</style>

<style lang="less" scoped>
.ellipsis-text-box {
  .ellipsis-text {
    font-size: 24px;
    color: #666;
    // line-height: 38px;
  }

  .ellipsis-text-bit {
    position: absolute;
    left: 0;
    top: -10000px;
  }

  .ellipsis-text-is-hidden {
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    // 留着以下注释，否则wenpack打包不上
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
  }

  .ellipsis-text-clamp-1 {
    /* autoprefixer: on */
    -webkit-line-clamp: 1;
  }
  .ellipsis-text-clamp-2 {
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
  }
  .ellipsis-text-clamp-3 {
    /* autoprefixer: on */
    -webkit-line-clamp: 3;
  }
  .ellipsis-text-clamp-4 {
    /* autoprefixer: on */
    -webkit-line-clamp: 4;
  }
  .ellipsis-text-clamp-5 {
    /* autoprefixer: on */
    -webkit-line-clamp: 5;
  }

  .ellipsis-text-icon {
    display: block;
    width: 22px;
    height: 24px;
    margin: 0 auto;
    padding: 12px;
    margin-top: 20px;
    box-sizing: border-box;
    background-image: url("./more.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    transition: all 0.3s;
  }
}
</style>
