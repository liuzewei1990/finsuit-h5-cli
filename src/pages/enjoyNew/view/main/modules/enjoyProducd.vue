<template>
  <content-box title="福利券专享产品" class="mar-top30" :linkIcon="true" v-if="list.length > 0">
    <div class="enjoy-producd" ref="enjoy-producd">
      <div class="item" v-for="(item,index) in list" :key="index" @click="$checkLogin({action:handleClickItem,data:item})" v-track:ACB0L005.click="()=>{}">
        <!-- 角标 -->
        <div class="tip ellipsis" v-show="item.COUPON_LABEL">
          {{item.COUPON_LABEL}}
        </div>
        <!-- 标题+产品 -->
        <h3 class="title">
          {{item.ORG_NAME}}
          <span v-if="item.ORG_NAME && item.PRD_NAME">|</span>
          {{item.PRD_NAME}}
        </h3>
        <!-- 利率+加息 -->
        <prdrate-template :rateData="item._rateData" :prdRateText="item.PRD_RATE_TEXT"></prdrate-template>
        <!-- 标签 -->
        <div class="tags">
          <div class="btn btn-box" v-for="(item,i) in item.TAGS" :key="i">
            <i class="btn-icon" :style="`backgroundImage:url(${item.labelIcon})`"></i>
            <span>{{item.labelName}}</span>
          </div>
        </div>
        <!-- btn按钮 -->
        <div class="footer">
          <Button :showLoading="false" type="warn" :disabled="false">立即抢购</Button>
        </div>
      </div>
    </div>
  </content-box>
</template>

<script>
import Button from "@enjoyNew/components/Button"
import ContentBox from "@enjoyNew/components/ContentBox/index.vue"
import { mapGetters } from "vuex"
import buyProducdMixin from "@enjoyNew/utils/buyProducdMixin.js"
import PrdrateTemplate from "@enjoyNew/components/PrdRateTemplate"
const defaultTagIconSrc = require("@enjoyNew/assets/images/tag.png")
export default {
  components: { Button, ContentBox, PrdrateTemplate },
  mixins: [buyProducdMixin],
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin: "renderData"
  },
  data () {
    return {
      list: [],
      btnLoading: this.$Loading(),
      // 缓存当前点击的item
      currClickItem: {}
    }
  },
  mounted () {
    this.renderData();
  },
  methods: {
    async renderData () {
      try {
        let params = {};
        let data = await this.$api.getEnjoyProducds(params);
        console.debug("this.$api.getEnjoyProducds", data);
        if (this.$utils.isObject(data)) {
          this.list = this.handleDataKey(data.DATA_LIST || []);
        } else {
          this.$Toast("this.$api.getEnjoyProducds data error")
        }
      } catch (error) {
        console.error(error);
      }
    },

    // 对后台返回的产品表数据进行过滤,只取需要的字段即可
    handleDataKey (dataList = []) {
      return dataList.map(item => {
        return {
          // 个投ID
          ID: item.ID,
          // 产品ID   
          PRD_INDEX_ID: item.PRD_INDEX_ID,
          // 银行名称
          ORG_NAME: item.ORG_NAME,
          // 产品名称
          PRD_NAME: item.PRD_NAME,

          /**
           * 登录前展示央行基准利率上浮30%，登陆后展示2.7300%或者央行基准利率上浮30%；
           * 加息文案前端默认展示+N%形式，后台可以将该加息手动修改为文字和符号形式，前端则显示后台修改的文字符号样式。
           */
          _rateData: this.$handlePrdRate.handleRateAndCouponRate(item.RATE_TEXT, item.PRD_RATE, item.COUPON_RATE),

          // 产品利率描述
          PRD_RATE_TEXT: item.PRD_RATE_TEXT,

          // 产品标签
          TAGS: this.handleTagsRule(item.SPREAD_TEXT2, [item.ICON_1, item.ICON_2, item.ICON_3]),

          // 产品切角标签
          COUPON_LABEL: item.COUPON_LABEL,

          // 产品标签不带icon
          // SPREAD_TEXT3: item.SPREAD_TEXT3,
        }
      })
    },

    // 标签处理 限制3个标签 返回 {labelName:"",labelIcon:""}
    handleTagsRule (tagStr, iconArr) {
      let tags = (tagStr + "").split(/[，,]/g, 3);
      if (tags.length === 0) return newTags;
      let newTags = [];

      for (let index = 0; index < tags.length; index++) {
        const labelName = (tags[index] + "");
        const labelIcon = (iconArr[index] + "").length > "undefined".length ? this.$Config.aliyuncHost + iconArr[index] : defaultTagIconSrc;
        newTags.push({ labelName, labelIcon })
      }
      return newTags;
    },

    // 点击立即购买 - 进入公共minxin逻辑
    async handleClickItem (item) {
      this.currClickItem = item;
      try {
        if (this.btnLoading.isShow) return;
        this.btnLoading.show();
        let params = {};
        let data = await this.$api.getEnjoyProducdStatus(params);
        console.debug("this.$api.getEnjoyProducdStatus", data);
        if (this.$utils.isObject(data)) {
          this.checkUserStatus(data);
        } else {
          this.$$Toast("this.$api.getEnjoyProducdStatus data error");
        }
        this.btnLoading.close();
      } catch (error) {
        this.btnLoading.close();
      }
    },

  }

}
</script>

<style lang="less" scoped>
.enjoy-producd {
  //   overflow-y: hidden;
  min-height: 476px;
  position: relative;
}
.item {
  border-radius: 14px;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 10px 0 30px;
}
.title {
  text-align: center;
  font-size: 34px;
  margin-top: 48px;
  padding: 0 70px;
}

.tags {
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .btn {
    min-width: 100px;
    height: 40px;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
  }

  .btn .btn-icon {
    // background-image: url("../../../assets/images/tag.png");
    width: 24px;
    height: 24px;
    margin: 0 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .btn span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-left: 1px;
  }
}

.footer {
  padding: 30px 28px 41px;
}

.tip {
  position: absolute;
  left: -55px;
  top: 25px;
  width: 227px;
  height: 66px;
  background: url("../../../assets/images/tip.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  transform-origin: center center;
  font-size: 20px;
  color: #fff;
  box-sizing: border-box;
  transform: rotate(-45deg);
  padding: 10px 30px 0;
}
</style>
