<template>
  <div class="producd-list" v-if="list.length > 0">
    <main-title title="产品推荐"></main-title>
    <div class="list">
      <ul>
        <li class="item" v-for="(item,index) in list" :key="index">
          <div class="rate">
            <p :class="item.PRD_RATE.type">
              <span class="rate-num ellipsis">{{item.PRD_RATE.value || "- -"}}</span>
              <span class="rate-unit">{{item.PRD_RATE.unit}}</span>
            </p>
            <i class="ellipsis">{{item.PRD_RATE_TEXT}}</i>
          </div>
          <div class="info">
            <p class="info-top">
              <span class="ellipsis">{{item.ORG_NAME}} <span class="ellipsis" v-if="item.ORG_NAME && item.PRD_NAME">|</span> {{item.PRD_NAME}}</span>
            </p>
            <p class="info-bottom ellipsis">
              <i>{{item.TXT_MIN_AMOUNT}} <span v-if="item.TXT_MIN_AMOUNT && item._PRD_DATE">|</span> {{item._PRD_DATE}}</i>
            </p>
          </div>
          <div class="btn">
            <a href="javascript:void(0);" @click="$checkLogin({action:handleClickItem,data:item})" v-track:ACB0L006.click="()=>{}">查看详情</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainTitle from "@enjoyNew/components/MainTitle/index.vue"
import buyProducdMixin from "@enjoyNew/utils/buyProducdMixin.js"
export default {
  components: { MainTitle },
  mixins: [buyProducdMixin],
  data () {
    return {
      list: [],
      btnLoading: this.$Loading(),
      // 缓存当前点击的item
      currClickItem: {}
    }
  },
  created () {
    this.renderData();
  },
  methods: {
    async renderData () {
      try {
        let params = { ACTITY_CODE: this.$Config.actityCode };
        let data = await this.$api.getUpProducds(params);
        console.debug("this.$api.getUpProducds", data);
        if (this.$utils.isArray(data)) {
          this.list = this.handleDataKey(data || []);
        } else {
          this.$Toast("this.$api.getUpProducds data error")
        }
      } catch (error) {
      }
    },

    // 对后台返回的产品表数据进行过滤,只取需要的字段即可
    handleDataKey (dataList = []) {
      return dataList.map(item => {
        return {
          // 产品ID
          PRD_INDEX_ID: item.PRD_INDEX_ID,
          // 银行名称
          ORG_NAME: item.ORG_NAME,
          // 产品名称
          PRD_NAME: item.PRD_NAME,
          // 产品利率 2.7300%
          PRD_RATE: this.$handlePrdRate.handlePrdRate(item.RATE_TEXT, item.PRD_RATE),
          // 产品利率描述
          PRD_RATE_TEXT: item.PRD_RATE_TEXT,
          // 起购金额
          TXT_MIN_AMOUNT: item.TXT_MIN_AMOUNT,
          // 产品期限
          _PRD_DATE: item.RATE_REMARKS || item.PEIOD_NAME || ""
        }
      })
    },

    // 点击立即购买
    async handleClickItem (item) {
      this.currClickItem = item;
      try {
        if (this.btnLoading.isShow) return;
        this.btnLoading.show();
        await this.$toProducdDetailUrl(item.PRD_INDEX_ID);
        this.btnLoading.close(500);
      } catch (error) {
        this.btnLoading.close();
      }
    },
  }
}
</script>

<style lang="less" scoped>
.producd-list {
  background: #fff;

  .list {
    padding: 0 28px 80px 28px;
    box-sizing: border-box;

    .item {
      display: flex;
      padding: 30px 20px;
      box-sizing: border-box;
      box-shadow: 0px 0px 5px 5px rgba(200, 200, 200, 0.2);
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .item {
      .rate {
        width: 180px;
        display: flex;
        flex-direction: column;
        text-align: left;
        p {
          flex: 1;
          display: flex;
          align-items: center;
          color: #e74e17;
          font-family: has_buy;
          .rate-num {
            font-size: 56px;
          }
          .rate-unit {
            position: relative;
            top: 5px;
            left: 2px;
            font-size: 30px;
          }
        }

        .利率_数字 {
        }

        .利率_汉字 {
          .rate-num {
            font-size: 30px;
            margin: 10px 0;
          }
        }

        i {
          color: #999999;
          font-size: 22px;
        }
      }

      .info {
        width: 300px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .info-top {
          flex: 1;
          color: #333333;
          font-size: 24px;
          display: flex;
          align-items: center;
        }
        .info-bottom {
          color: #999999;
          font-size: 22px;
        }
      }

      .btn {
        margin-left: 5px;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          width: 146px;
          height: 56px;
          color: #fff;
          font-size: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 6px;
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
        }
      }
    }
  }
}
</style>
