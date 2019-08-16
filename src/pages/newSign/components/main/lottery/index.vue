<template>
  <div class="main-lottery">
    <div class="lottery-history">
      <div class="lottery-history-inner">
        <msg-scroll v-if="this.sudoku" />
      </div>
    </div>
    <div class="lottery-box lamp-animation">
      <div class="lottery-main">

        <!-- 九宫格 -->
        <canvas id="canvas" width="500px" height="375px"></canvas>

        <!-- 九宫格中间按钮 -->
        <div class="btn" :class="{'btn-disabled':btnDisabled}" @click="startGame" v-show="this.sudoku" v-track:B000A124.click="()=>{}">
          <p>点击抽奖</p>
          <!-- APP内文案 -->
          <template v-if="APP_FLAG !== 'PMP'">
            <span v-if="lotteryNums > 0">你有{{lotteryNums}}次抽奖机会</span>
            <span v-if="lotteryNums === 0 && !$parent.isShare">分享获得抽奖机会</span>
            <span v-if="lotteryNums === 0 && $parent.isShare ">今日次数已用尽</span>
          </template>
          <!-- 小程序不支持分享 所以文案不一样 -->
          <template v-if="APP_FLAG === 'PMP'">
            <span v-if="lotteryNums > 0">你有{{lotteryNums}}次抽奖机会</span>
            <span v-else>今日次数已用尽</span>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import bj1 from "../images/prize-1.png";

import Sudoku from "./Sudoku.js";
import MsgScroll from "./msg-scroll.vue";
export default {
  components: { MsgScroll },
  data () {
    return {
      context: "",
      // 九宫格实例
      sudoku: "",
      // 奖项列表
      awards: [],
      // 上次中奖位置
      positionIndex: null,
      // 抽奖次数
      lotteryNums: 0,
      // 抽奖按钮loading状态
      btnLoading: false,

      APP_FLAG: sessionStorage.getItem("APP_FLAG")
    };
  },

  computed: {
    btnDisabled () {
      return this.lotteryNums === 0;
    }
  },

  mounted () {
  },

  methods: {
    init (prizeInfo, signInInfo) {

      this.prizeInfo = prizeInfo;
      this.lotteryNums = signInInfo.OPEN_PRIZE_NUM;

      // 转换数据格式
      let newPrizeInfo = this.filterNull(prizeInfo);
      this.awards = this.apiDataToData(newPrizeInfo);
      var canvas = document.getElementById("canvas");
      this.context = canvas.getContext("2d");

      this.sudoku = new Sudoku({
        sudokuSize: canvas.width,
        sudokuItemRadius: 8,                                // 方块圆角阔值
        sudokuItemPadding: 2,                              // 方块间padding值
        sudokuItemScale: 1.4,                               // 是否变形 比如：正方形或者长方形
        sudokuItemMargin: 12,                               // 方块间marggin值
        sudokuItemShadowOffsetY: 6,                         // 方块阴影偏移量

        sudokuItemUnactiveColor: "#fff",                    // 方块背景颜色
        // sudokuItemUnactiveTxtColor:"#fff",               // 文字颜色
        sudokuItemUnactiveShadowColor: "#ffcec0",           // 方块阴影颜色

        sudokuItemActiveColor: "#ffe201",                   // 跳动方块颜色
        // sudokuItemActiveTxtColor:"#fff",                 // 跳动方块文字颜色
        sudokuItemActiveShadowColor: "#f79c00",             // 跳动方块阴影颜色

        // buttonColor:"#000",                              // 按钮背景颜色
        // buttonTxtColor:"#fff",                           // 按钮文字颜色
        // buttonShadowColor:"#ccc",                        // 按钮阴影颜色

        duration: 3000,                                     //中奖后动画停止的时间
        velocity: 400,                                      // 动画结尾转动速率
        speed: 50,                                          // loading = true 状态下转动的速度
        hasButton: "false",                                 // 九宫格是否自带按钮
        // delaultActiveIndex:5,                            // 当前已中奖的方块

        awards: this.awards,

        // 九宫格停止后的回调
        finish: (gamePositionIndex) => {
          this.btnLoading = false;
          if (this.positionIndex === gamePositionIndex) {
            this.$emit("gameOver", this.awards[gamePositionIndex].ID);
          } else {
            this.$Toast("gameOver error");
          }
        },

        // 九宫格自身按钮点击后触发 hasButton = “true” 时有效
        onClick: () => { },

        // 九宫格每格跳动时触发
        nextTick: (nextIndex) => { }
      });

      this.sudoku.render(canvas, this.context);
    },

    // 设置默认中奖位置
    setDefaultPosition (prizePosition) {
      let prizePositionObj = this.prizeInfo[prizePosition];
      if (this.$utils.isObject(prizePositionObj)) {
        const index = this.awards.findIndex(item => item.ID == prizePositionObj.ID);
        this.sudoku.setDefaultActive(index, this.context);
      }
    },

    // 开始按钮
    startGame () {
      if (this.sudoku === "") return;
      if (this.btnLoading) return;
      if (this.btnDisabled) return;
      this.$emit("clickGameBtn");
    },

    // 开始转动 进入loading阶段
    startTurn () {
      this.btnLoading = true;
      this.sudoku.luckyDraw(this.context);
    },

    // 停止转动 进入缓冲阶段 到指定位置
    stopTurnPosition (prizeId) {
      if (this.$utils.isNumber(Number(prizeId))) {
        this.positionIndex = this.awards.findIndex(item => item.ID === prizeId);
        if (this.positionIndex === -1) {
          this.error();
          this.$Toast("网络异常，请刷新页面或查看我的奖品列表")
          throw "中奖位置异常";
        }
        this.sudoku.prize(this.positionIndex);
      } else {
        this.$Toast("prizeId error");
      }
    },

    // 当接口出错时，调用该方法让九宫格停止转动 和 重绘
    error () {
      this.btnLoading = false;
      this.sudoku.onerror();
      this.sudoku.reRender(this.context);
    },

    // 增加抽奖次数
    addLotteryNums () {
      this.lotteryNums += 1;
    },

    // 减少抽奖次数
    removeLotteryNums () {
      this.lotteryNums -= 1;
    },

    // 后台配置不启动会出现item为 null 这里过滤null的情况
    filterNull (prizeInfo) {
      if (prizeInfo instanceof Array) return [];
      let newPrizeInfo = {};
      for (const key in prizeInfo) {
        let item = prizeInfo[key];
        if (item) newPrizeInfo[key] = item;
      }
      return newPrizeInfo;
    },
    // 接口数据列表转换组件需要的格式
    apiDataToData (prizeInfo) {
      if (prizeInfo instanceof Array) return [];
      let prizeInfoKeys = Object.keys(prizeInfo);
      if (prizeInfoKeys.length !== 8) {
        this.$Toast("奖品列表应为8条")
        throw "奖品列表条数异常，可能会出现中奖异常，列表应该为8条";
      }
      prizeInfoKeys.sort();
      let awards = [];
      for (let index = 0; index < 8; index++) {
        const key = prizeInfoKeys[index];
        if (key) {
          let item = prizeInfo[key];
          item["type"] = "image";
          item["content"] = this.$Config.aliyuncHost + item.PRIZE_FRONT_IMG;
          //   item["content"] = bj1;
          awards.push(item);
        } else {
          let item = {};
          item["type"] = "text";
          item["content"] = "缺少奖品";
          awards.push(item);
        }
      }
      return awards;
    },

  }
};
</script>
 

<style lang="less" scoped>
.main-lottery {
  background: #fff;
  padding: 40px 0px;
}

.lottery-history {
  width: 486px;
  height: 80px;
  border-radius: 14px;
  margin: 0 auto 30px;
  background: #feaca9;
  display: flex;
  align-items: center;
  position: relative;
}

.lottery-history::before,
.lottery-history::after {
  content: "";
  width: 20px;
  height: 30px;
  background: #feaca9;
  position: absolute;
  bottom: -30px;
  left: 0;
}

.lottery-history::before {
  left: 121.5px;
}

.lottery-history::after {
  left: 364.5px;
}

.lottery-history-inner {
  width: 468px;
  height: 62px;
  border-radius: 14px;
  margin: 0 auto;
  background: #f46c56;
}

.lottery-box {
  width: 710px;
  height: 579px;
  margin: 0 auto;
  background: #feaca9 url("../images/lamp.png") no-repeat;
  background-size: 99.5% 99.5%;
  background-position: center center;
  border-radius: 20px;
  display: flex;
  align-items: center;
  border: 10px solid #feaca9;
  box-sizing: border-box;
}

.lottery-main {
  width: 638px;
  height: 499px;
  background: #e25341;
  margin: 0 auto;
  border-radius: 20px;
  position: relative;
  border: 5px solid #e25341;
  /* box-sizing: border-box; */
}

.lottery-main canvas {
  width: 638px;
  height: 499px;
}

.lottery-main .btn {
  width: 200px;
  height: 146px;
  border-radius: 10px;
  /* background: #ffe201; */
  background: repeating-linear-gradient(
    -45deg,
    #ffd901 0,
    #ffd901 5px,
    #ffe201 0,
    #ffe201 20px
  );

  color: #fff;
  box-shadow: 0px 10px 1px 0px #f79c00;
  /* line-height: 153px; */
  position: absolute;
  left: 219px;
  top: 170px;
  color: #d92a00;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.lottery-main .btn p {
  font-size: 34px;
  font-weight: 600;
  line-height: 60px;
}

.lottery-main .btn span {
  font-size: 22px;
}

.lottery-main .btn-disabled {
  background: #ddd;
  box-shadow: 0px 10px 1px 0px #ccc;
  color: #999;
}

/* 跑马灯 */
.lamp-animation {
  animation: lamp 0.5s linear infinite;
}

@keyframes lamp {
  0% {
    background-image: url("../images/lamp.png");
  }

  100% {
    background-image: url("../images/lamp2.png");
  }
}
</style>
