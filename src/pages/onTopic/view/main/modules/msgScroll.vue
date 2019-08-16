<template>
  <div class="msg-scroll" v-if="text">
    <div class="icon"></div>
    <div class="msg-scroll-box" ref="scrollBox">
      <p class="scroll" ref="scroll">
        <span ref="text1">{{text}}</span>
      </p>
    </div>
  </div>
</template>

<script>
let scrollValue = 0;
export default {
  props: {
    text: String,
    nbspNum: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    // 初始化
    init () {
      let scrollBox = this.$refs["scrollBox"];
      let scroll = this.$refs["scroll"];
      let text1 = this.$refs["text1"];
      let nbsp = this.nbsp();
      let text2 = document.createElement("span");

      if (text1.getBoundingClientRect().width > scrollBox.getBoundingClientRect().width) {
        text1.innerHTML = text1.innerHTML + nbsp;
        text2.innerHTML = text1.innerHTML;
        scroll.appendChild(text2);
        this.play();
      }
    },

    // 播放
    play () {
      window.requestAnimationFrame(() => {
        let scrollBox = this.$refs["scrollBox"];
        let textWidth = this.$refs["text1"].getBoundingClientRect().width;

        if (textWidth - scrollBox.scrollLeft <= 0) {
          scrollValue = scrollBox.scrollLeft - textWidth;
          scrollBox.scrollLeft = scrollValue;
        } else {
          scrollValue = scrollValue + 1;
          scrollBox.scrollLeft = scrollValue;
        }

        this.play();
      });
    },

    // 空格
    nbsp () {
      let nbspStr = "";
      for (let index = 0; index < this.nbspNum; index++) nbspStr += "&nbsp;";
      return nbspStr;
    }
  }
};
</script>

<style scoped>
.msg-scroll {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 46px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
}

.icon {
  /* padding: 10px; */
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../../assets/images/msg-icon.png") no-repeat;
  background-size: 25px 27px;
  background-position: center center;
}

.msg-scroll-box {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
}

.msg-scroll-box p {
  /* display: inline-block; */
  line-height: 46px;
  font-size: 22px;
  color: #fff;
  /* display: flex; */
  /* width: 100%; */
  /* height: 100%; */
  /* justify-content: center; */
  align-items: center;
  /* border: 1px solid red; */
}
</style>
