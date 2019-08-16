<template>
  <div id="page" class="money-detail">
    <Header :rate="enjoyMoneyData.PRD_RATE" :rateLabel="enjoyMoneyData.PRD_RATE_LABEL" :days="enjoyMoneyData.PRD_VALID_PERIOD" :daysLabel="enjoyMoneyData.VALID_PERIOD_LABEL"></Header>
    <!-- 产品周期 -->
    <Panel title="产品周期" class="mar">
      <!-- 注意：current如果使用动态步骤 该组件的线条存在bug,暂未解决2019-6-10。目前不需要动态步骤 -->
      <step :current="3" current-icon="success" current-color="#3B6ADC">
        <step-item>
          <p slot="top">起息日</p>
          <p slot="bottom">{{enjoyMoneyData.START_DATE | toDate}}</p>
        </step-item>
        <step-item>
          <p slot="top">结息日</p>
          <p slot="bottom">{{enjoyMoneyData.END_DATE | toDate}}</p>
        </step-item>
        <step-item>
          <p slot="top">预期到账日</p>
          <p slot="bottom">{{enjoyMoneyData.ACCOUNT_DATE | toDate}}</p>
        </step-item>
      </step>
    </Panel>

    <!-- 产品详情 -->
    <Panel title="产品详情" class="mar-top30">
      <cell title="投资金额(元)">
        <span slot="desc" style="color:#333333;">{{enjoyMoneyData.PRD_INVEST_AMOUNT}}</span>
      </cell>
      <cell title="预期收益(元)">
        <span slot="desc" style="color:#333333;">{{enjoyMoneyData.PROFIT}}</span>
      </cell>
      <cell title="支取规则">
        <span slot="desc" style="color:#333333; flex:3; text-align:right;">{{enjoyMoneyData.PRD_DRAW_RULE}}</span>
      </cell>
    </Panel>

    <!-- 产品描述 -->
    <Panel title="产品描述" class="mar-top30">
      <p>{{enjoyMoneyData.PRD_DESC }}</p>
    </Panel>

    <!-- Tabar -->
    <div class="tabar" v-if="enjoyMoneyData.PRD_RATE">
      <Button class="btn" :showLoading="btnLoading" :disabled="btnLoading" @click.native="getEnjoyMoneyUseStatus" v-track:ACB0L007.click.native="{fn:()=>{},id:enjoyMoneyData.ID}">立即使用</Button>
    </div>
  </div>
</template>

<script>
import Header from "./modules/header.vue"
import Panel from "@enjoyNew/components/Panel.vue"
import { Step, StepItem } from "@enjoyNew/components/Step"
import Cell from "@enjoyNew/components/Cell"
import Button from "@enjoyNew/components/Button"
export default {
  components: { Header, Panel, Step, StepItem, Cell, Button },
  data () {
    return {
      // 体验金数据
      enjoyMoneyData: {},
      btnLoading: false,
      // 版本开关 1.0.8 版本的拼财不支持该方法 h5Certify()   (v1 < v2) 
      vFlag: this.$utils.isVersion(this.$Config.PC_V, this.$store.state.VERSION)
    }
  },
  created () {
    this.renderData();
  },
  methods: {
    async renderData () {
      let data = await this.$api.getEnjoyMoneyData();
      console.debug("this.$api.getEnjoyMoneyData", data);
      if (this.$utils.isObject(data)) {
        this.enjoyMoneyData = this.$utils.isArray(data.DATA_LIST) ? data.DATA_LIST[0] : {};
      } else {
        this.$Toast("this.$api.getEnjoyMoneyData data error");
      }
    },

    async getEnjoyMoneyUseStatus () {
      try {
        this.btnLoading = true;
        let params = { BBIN_ID: this.enjoyMoneyData.ID };
        let data = await this.$api.getEnjoyMoneyUseStatus(params);
        console.debug("this.$api.getEnjoyMoneyUseStatus", data);
        if (this.$utils.isObject(data)) {
          this.checkEnjoyMoneyUseStatus(data);
        } else {
          this.$Toast("this.$api.getEnjoyMoneyUseStatus data error");
        }
        this.btnLoading = false;
      } catch (error) {
        this.btnLoading = false;
      }
    },

    // 检测状态是否需要实名认证
    checkEnjoyMoneyUseStatus (data) {
      switch (String(data.DRAW_STATUS)) {
        // 需要实名
        case "0":
          this.toAuthPage();
          break;
        // 已使用
        case "1":
        // 收益中
        case "2":
        // 体验完成收益冻结中
        case "3":
        // 已解冻，已发放奖励到钱包
        case "4":
          this.$router.replace({ path: "/moneyResult", query: { enjoyMoneyId: this.enjoyMoneyData.ID } });
          break;
        default:
          this.$Toast("体验金状态异常，请稍候再试")
          break;
      }
    },

    // 领取实名红包 --- 去实名认证
    toAuthPage () {
      // APP实名认证跳原生 接受回调函数
      if ((this.$store.state.APP_FLAG === "PC" && this.vFlag === false) || this.$store.state.APP_FLAG === "BC") {
        this.$bcBridge.h5Certify({
          success: (v) => {
            console.log("this.$bcBridge.h5Certify", v);

            this.$router.replace({ path: "/moneyResult", query: { enjoyMoneyId: this.enjoyMoneyData.ID } });
          },
          fail: () => {
            this.$Toast("认证失败");
          },
        });
      }

      //  拼财app版本1.0.8版本跳转h5实名认证
      else if (this.$store.state.APP_FLAG === "PC" && this.vFlag === true) {
        let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/moneyResult";
        url += `?enjoyMoneyId=${this.enjoyMoneyData.ID}`;
        url += `&isAuthReturn=true`;
        this.$toRealNameAuthUrl(url);
      }

      // 非APP实名认证跳H5认证页，认证成功回调地址
      else {
        let url = this.$Config.h5Host + this.$Config.h5ServerPath + "/#/moneyResult";
        url += `?PMP_FLAG=1`;
        url += `&MEMBER_ID=${this.$store.state.ID}`;
        url += `&TOKEN=${this.$store.state.TOKEN}`;
        url += `&SYSTEM_TYPE=${this.$store.state.SYSTEM_TYPE}`;
        url += `&MODEL=${this.$store.state.MODEL}`;
        url += `&OPEN_API_CHANNEL_ID=${this.$store.state.OPEN_API_CHANNEL_ID}`;
        url += `&enjoyMoneyId=${this.enjoyMoneyData.ID}`;
        url += `&isAuthReturn=true`;
        this.$toRealNameAuthUrl(url);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.money-detail {
  padding-bottom: 200px;
}
.mar {
  margin-top: -50px !important;
}
.tabar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background: #fff;

  .btn {
    font-size: 36px;
    line-height: unit(84px/36px);
    color: #fff;
    background: -webkit-linear-gradient(
      to bottom right,
      #4f82ff,
      #3b6adc
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      to bottom right,
      #4f82ff,
      #3b6adc
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      to bottom right,
      #4f82ff,
      #3b6adc
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(
      to bottom right,
      #4f82ff,
      #3b6adc
    ); /* 标准的语法（必须放在最后） */

    &:not(.weui-btn_disabled):visited {
      color: #ffffff;
    }
    &:not(.weui-btn_disabled):active {
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
