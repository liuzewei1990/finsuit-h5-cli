<template>
  <div id="page" class="money-result" ref="money-result">
    <!-- 体验金进度详情 -->
    <time-line class="time-line-box" v-if="enjoyMoneyStatus != 0">
      <!-- 1.已使用 -->
      <time-line-item :class="{'time-active':enjoyMoneyStatus>=1}">
        <i slot="icon" class="time-active-icon" v-if="enjoyMoneyStatus>=1"></i>
        <p class="title">成功使用{{enjoyAmount}}元体验金</p>
        <p class="desc">{{useDate | toDate}}</p>
      </time-line-item>

      <!-- 2.收益中 -->
      <time-line-item :class="{'time-active':enjoyMoneyStatus>=2}">
        <i slot="icon" class="time-active-icon" v-if="enjoyMoneyStatus>=2"></i>
        <p class="title">开始计算收益</p>
        <p class="desc">{{startDate | toDate}}</p>
      </time-line-item>

      <!-- 3.体验完成 -->
      <time-line-item :class="{'time-active':enjoyMoneyStatus>=3}">
        <i slot="icon" class="time-active-icon" v-if="enjoyMoneyStatus>=3"></i>

        <!-- 体验未完成 -->
        <template v-if="enjoyMoneyStatus < 3">
          <p class="title">{{accountAmount}}元到余额，可去余额提现</p>
          <p class="desc">{{accuntDate | toDate}}</p>
        </template>

        <!-- 3.体验完成 - 未完成首投 -->
        <template v-if="enjoyMoneyStatus == 3">
          <a href="javascript:void(0);" class="btn-tip">未完成首投</a>
          <p class="title">{{accountAmount}}元冻结中，首投满足条件即可提现</p>
          <p class="desc">{{accuntDate | toDate}}</p>
        </template>

        <!-- 4.体验完成 - 完成首投 -->
        <template v-if="enjoyMoneyStatus == 4">
          <a href="javascript:void(0);" class="btn-tip">完成首投</a>
          <p class="title" @click="toAppWalletPage">{{accountAmount}}元已到余额，去提现</p>
          <p class="desc">{{accuntingDate | toDate}}</p>
        </template>
      </time-line-item>
    </time-line>
    <!-- 新手专享产品 -->
    <new-user-producds class="mar-top20" v-if="buyStatus === '0'"></new-user-producds>
    <!-- 推荐产品 -->
    <up-producds class="mar-top20" v-if="buyStatus === '1'"></up-producds>
  </div>
</template>

<script>
import { TimeLine, TimeLineItem } from "@enjoyNew/components/Timeline-1"
import NewUserProducds from "./modules/newUserProducds"
import UpProducds from "./modules/upProducds"

export default {
  components: { TimeLine, TimeLineItem, NewUserProducds, UpProducds },
  data () {
    return {
      enjoyMoneyId: this.$route.query["enjoyMoneyId"],
      // 体验金进度状态
      enjoyMoneyStatus: "",
      // 体验金金额
      enjoyAmount: "",
      // 预计收益余额
      accountAmount: "",
      // 使用日期
      useDate: "",
      // 起息日期
      startDate: "",
      // 预计到账日期（收益冻结日期）
      accuntDate: "",
      // 体验金到账余额时间
      accuntingDate: "",
      //  客户端当前日期，用来判断是否为今天 xxxx-xx-xx
      currDate: this.$utils.getNowFormatDate(),
      /**
       * 用户首投状态,需求来源：推荐产品根据用户是否购买首投专享产品分开配置
       * 1、已购买首投专享产品的用户展示推荐产品
       * 2、未购买首投专享产品的用户展示新手专享产品
       * 首投专享产品指的是全平台所有产品
       */
      buyStatus: "",//0未购买  1已购买

      viewLoading: this.$Loading("数据加载中..."),

      // 版本开关 1.0.8 版本的拼财不支持该方法 h5Certify()   (v1 < v2) 
      vFlag: this.$utils.isVersion(this.$Config.PC_V, this.$store.state.VERSION)

    }
  },
  created () {
    this.renderData(this.enjoyMoneyId);

    // H5实名认证成功回调地址到体验金结果页时，处理浏览器的返回键
    if ((this.$store.state.APP_FLAG === "PC" && this.vFlag === false) || this.$store.state.APP_FLAG === "BC") {
      //...
    }
    else if (this.$store.state.APP_FLAG === "PC" && this.vFlag === true) {
      this.handleBrowserReturn();
    }
    else {
      this.handleBrowserReturn();
    }
  },
  methods: {
    async renderData (enjoyMoneyId) {
      try {
        this.viewLoading.show();
        let params = { BBIN_ID: enjoyMoneyId };
        let data = await this.$api.getEnjoyMoneyUseStatus(params);
        this.viewLoading.close();
        console.debug("this.$api.getEnjoyMoneyUseStatus", data);
        if (this.$utils.isObject(data)) {
          this.checkEnjoyMoneyUseStatus(data);
          this.checkEnjoyMoneyUseStatusDate(data);
          this.accountAmount = data.ACCOUNT_AMOUNT || "--";
          this.enjoyAmount = data.BUY_AMOUNT || "--";
          this.buyStatus = data.BUY_STATUS + "";
        } else {
          this.$Toast("this.$api.getEnjoyMoneyUseStatus data error");
        }
      } catch (error) {
        this.viewLoading.close();
      }
    },
    // 检测状态是否需要实名认证
    checkEnjoyMoneyUseStatus (data) {
      switch (String(data.DRAW_STATUS)) {
        // 需要实名
        case "0":
          this.$Toast("用户实名认证状态异常");
          break;
        // 已使用
        case "1":
          this.enjoyMoneyStatus = "1";
          break;
        // 收益中
        case "2":
          this.enjoyMoneyStatus = "2";
          break;
        // 体验完成收益冻结中
        case "3":
          this.enjoyMoneyStatus = "3";
          break;
        // 已解冻，已发放奖励到钱包
        case "4":
          this.enjoyMoneyStatus = "4";
          break;
        default:
          this.$Toast("体验金状态异常，请稍候再试");
          break;
      }
    },

    // 处理日期
    checkEnjoyMoneyUseStatusDate (data) {
      this.useDate = (data.USE_DATE + "").split(" ")[0] == this.currDate ? "今天" : data.USE_DATE || "-- --";
      this.startDate = data.START_DATE || "-- --";
      this.accuntDate = data.ACCOUNT_DATE || "-- --";
      this.accuntingDate = data.ACCOUNTING_DATE || "-- --";
    },

    // 点击去提现文案跳转到我的钱包
    toAppWalletPage () {
      if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.toAppWalletPage();
      } else {
        this.$dowloadAppHelp();
      }
    },

    // 处理浏览器返回，当实名认证成功后跳到此页面时，让其返回活动首页
    handleBrowserReturn () {
      let isAuthReturn = this.$route.query["isAuthReturn"];
      if (isAuthReturn === "true" && window.history) {
        window.history.pushState(null, null);
        window.addEventListener("popstate", this.handleEventFn);
      }
    },

    // 返回到首页
    handleEventFn () {
      // 当回到首页后 判断有参数isAuthReturn时 会注入新的pushState 再次点击返回时，返回小程序首页，而不是实名认证页面。
      this.$router.replace({ path: "/", query: { isAuthReturn: "true" } });
    }
  },
  destroyed () {
    window.removeEventListener("popstate", this.handleEventFn)
  }
}
</script>

<style lang="less" scoped>
.time-line-box {
  padding: 40px 0;
  .title {
    color: #333333;
    font-size: 30px;
  }

  .desc {
    color: #999999;
    font-size: 24px;
  }
}

.time-active {
  .title {
    color: #3b6adc;
  }
}
.time-active-icon {
  display: inline-block;
  background-color: #fff;
  width: 30px;
  height: 30px;
  background-image: url("../../assets/images/icon.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: none;
  box-shadow: 0 0 0 6px #fff;
}

.btn-tip {
  font-size: 20px;
  color: #3b6adc;
  border-radius: 5px;
  border: 3px solid #3b6adc;
  padding: 0px 5px;
  position: absolute;
  top: -10px;
  left: 0;
}
</style>
