<template>
  <div class="main-head">
    <div class="main-head-box">
      <!-- 头部信息 -->
      <div class="row head-title" v-show="signInDateList.length === 7">

        <!-- 签到满7天 可抽大奖 -->
        <div class="head-title-box dev" v-if="isMaxPrize">
          <p class="p1">已连续签到<span>{{signInNums}}</span>天</p>
          <span class="head-open-btn" :class="{'open-btn-disabled':isDisabled}" @click="openMaxPrize" v-track:ACB0F001.click="()=>{}">
            <span>{{isDisabled?"已开启":"去开启"}}</span>
          </span>
          <p class="p2">可开启礼包</p>
        </div>

        <!-- 签到未满7天 -->
        <div class="head-title-box dev" v-else>
          <p class="p1">连续签到<span>{{signInNums}}</span>天</p>
          <p class="p2">再签到<span>{{signInDateList.length - signInNums}}</span>天有惊喜！</p>
        </div>

        <!-- 签到提醒 小程序不显示 -->
        <div class="head-switch-box dev" v-if="APP_FLAG === 'PC' || APP_FLAG === 'BC'">
          <div class="switch" v-track:B000A122.click="()=>{}">
            <XSwitch v-model="switchs" @click.native="clickSwitch" :disabled="false" />
          </div>
          <p class="p1">签到提醒</p>
        </div>
      </div>

      <!-- 日期列表 -->
      <div class="row head-date">
        <ul>
          <li class="dev" v-for="(item,index) in signInDateList" :key="index">
            <!-- 礼包盒子 -->
            <div class="head-date-gold is-show-box dev" v-if="item.IS_BIG_PRIZE === 1"></div>
            <!-- 金币位置 -->
            <div class="head-date-gold dev" :class="{'is-show-active':index == currActive}" v-if="item.IS_BIG_PRIZE !== 1"></div>

            <span class="head-data-time is-show-active-color" v-if="index == currActive">今日</span>
            <span class="head-data-time" v-else>{{item.DATE_AXIS | dataAxis}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import XSwitch from "@newSign/components/common/Switch.vue"
export default {
  components: { XSwitch },
  data () {
    return {
      // switch开关
      switchs: false,
      // 当前签到状态 index
      currActive: 0,
      // 日期列表
      signInDateList: [],
      // 签到信息
      signInInfo: {},
      // 连续签到天数
      signInNums: 0,
      // 是否可以开启大奖
      isMaxPrize: false,
      // 是否已经开启大奖
      isDisabled: false,
      APP_FLAG: sessionStorage.getItem("APP_FLAG")
    }
  },
  filters: {
    dataAxis (v) {
      v += "";
      let s = v.split("-");
      return `${s[1]}.${s[2]}`;
    }
  },
  methods: {
    init (signInDateList, signInInfo) {
      // 日期list
      this.signInDateList = signInDateList;
      // 是否开启签到提醒
      this.switchs = signInInfo.IS_REMID == 1 ? true : false;
      // 签到天数
      this.signInNums = signInInfo.SINGIN_NUM;
      // 检查是否有大奖
      this.isCheckMaxPrize(signInDateList);
    },

    // 点击开启大奖
    openMaxPrize () {
      if (this.isDisabled) return;
      this.$emit("openMaxPrize");
    },

    // 点击switch开关
    clickSwitch () {
      this.$emit("switchFlag", this.switchs);
    },

    // 设置禁用状态
    disabledMaxPrizeBtn () {
      this.isDisabled = true;
    },

    // 检测是否签到满7天 开启大奖
    isCheckMaxPrize (signInDateList) {
      let obj = signInDateList.find(item => item.hasOwnProperty("IS_OPEN"));
      if (obj) {
        this.isMaxPrize = (signInDateList.length - this.signInNums) === 0;
        // 是否已经开启大奖
        obj.IS_OPEN == 1 && this.disabledMaxPrizeBtn();
      }
    }
  }
}                                                                                                                      
</script>

<style lang="less" scoped>
.main-head {
  background: #fff;
  padding-bottom: 20px;
}
.main-head-box {
  width: 698px;
  border-radius: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 30px 0px #dfdfdf;
  margin: -145px auto 0;
  position: relative;
  z-index: 1;
  // 最小高度 避免重绘
  min-height: 310px;
}

.head-title {
  // border-bottom: 1px solid #ccc;
  padding: 25px;
  box-sizing: border-box;
  display: flex;
  .head-title-box {
    flex: 1;
    p {
      line-height: 50px;
    }
    .p1 {
      font-size: 36px;
      font-weight: 400;
      color: #222;
      display: inline-block;
      span {
        color: #ec6a55;
      }
    }
    .p2 {
      font-size: 24px;
      color: #333333;
      span {
        color: #ec6a55;
      }
    }
  }

  .head-open-btn {
    margin-left: 20px;
    display: inline-block;
    border-radius: 6px;
    background: #eb5f48;
    font-size: 28px;
    color: #fff;
    span {
      width: 134px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .open-btn-disabled {
    background: #d5d5d5;
  }

  .head-switch-box {
    min-width: 90px;
    .switch {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .p1 {
      color: #999999;
      font-size: 24px;
      line-height: 50px;
    }
  }
}

.head-date {
  padding: 10px 25px 30px;
  box-sizing: border-box;
  min-height: 160px;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    li {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
      .head-date-gold {
        position: relative;
        width: 61px;
        height: 63px;
        background: url("./images/gold-2.png") no-repeat;
        background-size: 100%;
        img {
          width: 100%;
          height: 100%;
        }
        &:after {
          content: "";
          position: absolute;
          left: 2px;
          right: 0;
          bottom: -8px;
          margin: auto;
          width: 35px;
          height: 1px;
          border-radius: 100%;
          background: #fff;
          opacity: 0.2;
          box-shadow: 0px 5px 5px 2px #a4a4a4;
        }
      }
      .head-data-time {
        font-size: 22px;
        color: #b3b3b3;
        margin-top: 25px;
      }

      // 目标礼品盒
      .is-show-box {
        background-image: url("./images/gift.gif");
      }

      // 设置金币选中状态
      .is-show-active {
        background-image: url("./images/gold-1.png");
        &::after {
          box-shadow: 0px 5px 5px 2px #eb5f48;
        }
      }

      // 设置选中的颜色
      .is-show-active-color {
        color: #eb5f48;
      }
    }
  }
}
</style>
