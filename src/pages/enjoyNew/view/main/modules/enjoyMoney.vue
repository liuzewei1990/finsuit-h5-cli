<template>
  <content-box title="我的专享体验金" style="margin-top:'-50px'" v-show="isShow">
    <div class="enjoy-money" ref="enjoy-money" @click="$checkLogin({action:handleClick})" v-track:ACB0L003.click="{fn:()=>{},enjoyMoneyBtnStatus:enjoyMoneyBtnStatus}">
      <div class="item">
        <div class="item-content">
          <div v-show="enjoyMoneyData.COUPON_AMOUNT">
            <h3>{{enjoyMoneyData.COUPON_TITLE}}</h3>
            <div class="money"><span>{{enjoyMoneyData.COUPON_AMOUNT}}</span></div>
            <div class="tags">
              <span v-for="(item,index) in enjoyMoneyTags" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="item-btn" v-show="enjoyMoneyData.COUPON_AMOUNT">
          <Button :showLoading="btnLoading" type="warn" :disabled="btnLoading" v-if="enjoyMoneyBtnStatus ==='0' || enjoyMoneyBtnStatus ==='4'">免费领取</Button>
          <Button :showLoading="btnLoading" type="warn" :disabled="btnLoading" v-if="enjoyMoneyBtnStatus ==='1'">收益中</Button>
          <Button :showLoading="btnLoading" type="warn" :disabled="btnLoading" v-if="enjoyMoneyBtnStatus ==='2'">体验完成，收益冻结中</Button>
          <Button :showLoading="btnLoading" type="warn" :disabled="btnLoading" v-if="enjoyMoneyBtnStatus ==='3'">已完成</Button>
        </div>
      </div>
    </div>
  </content-box>
</template>

<script>
import ContentBox from "@enjoyNew/components/ContentBox/index.vue"
import Button from "@enjoyNew/components/Button"
import { mapGetters } from "vuex"
export default {
  components: { ContentBox, Button },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin () {
      this.renderData();
    }
  },
  data () {
    return {
      // 是否显示该模块：后台不配置则不显示
      isShow: false,
      //0 免费领取  1 收益中  2体验完成，收益冻结中 3已完成 4 不是新用户 
      enjoyMoneyBtnStatus: "",
      // 体验金数据
      enjoyMoneyData: {},
      // 体验金标签
      enjoyMoneyTags: [],
      // 模块loging
      // viewLoading: this.$Loading(),
      // 按钮loading
      btnLoading: false,
    }
  },
  mounted () {
    // this.renderData(true);
  },
  activated () {
    this.renderData();
  },
  methods: {
    // 获取数据渲染体验金
    async renderData (isLoading = false) {
      try {
        // isLoading && this.viewLoading.show(this.$refs["enjoy-money"]);
        let params = {};
        let data = await this.$api.getEnjoyMoneyData(params);
        console.debug("this.$api.getEnjoyMoneyData", data);
        if (this.$utils.isObject(data)) {
          this.enjoyMoneyBtnStatus = (data.STATUS + "") || "";
          this.enjoyMoneyData = this.$utils.isArray(data.DATA_LIST) ? data.DATA_LIST[0] || {} : {};
          this.enjoyMoneyTags = this.handleTag(this.enjoyMoneyData.PRD_LABEL);
          this.isShow = Object.keys(this.enjoyMoneyData).length !== 0;
        } else {
          this.$Toast("this.$api.getEnjoyMoneyData data error");
        }
        // this.viewLoading.close();
      } catch (error) {
        // this.viewLoading.close();
        console.error(error);
      }
    },

    // 处理标签规则 标签规则：两个标签单个文字最多为10个 三个标签每个最多为6个
    handleTag (tagStr) {
      let newTags = [];
      let tags = (tagStr += "").split(/[，,]/g, 3);
      if (tags.length === 0) return newTags;
      if (tags.length <= 2) tags.forEach(item => { item && newTags.push(item.slice(0, 10)) });
      else tags.forEach(item => { item && newTags.push(item.slice(0, 8)) });
      return newTags;
    },

    // 处理按钮点击逻辑
    async handleClick () {
      try {
        if (this.btnLoading) return;
        this.btnLoading = true;
        let params = {};
        let data = await this.$api.getEnjoyMoneyStatus(params);
        if (this.$utils.isObject(data)) {
          this.enjoyMoneyStatusToUrl((data.STATUS + "") || "");
        } else {
          this.$Toast("this.$api.getEnjoyMoneyStatus data error");
        }
        this.btnLoading = false;
      } catch (error) {
        this.btnLoading = false;
        console.error(error);
      }
    },

    // 根据体验金最新状态对应不同策略
    enjoyMoneyStatusToUrl (newEnjoyMoneyStatus) {
      switch (newEnjoyMoneyStatus) {
        // 未使用
        case "0":
          this.$router.push("/moneyDetail");
          break;
        // 收益中
        case "1":
          this.$router.push({ path: "/moneyResult", query: { enjoyMoneyId: this.enjoyMoneyData.ID } });
          break;
        // 体验完成，金额冻结中
        case "2":
          this.$router.push({ path: "/moneyResult", query: { enjoyMoneyId: this.enjoyMoneyData.ID } });
          break;
        // 体验完成，金额解冻，已存入我的钱包
        case "3":
          this.$router.push({ path: "/moneyResult", query: { enjoyMoneyId: this.enjoyMoneyData.ID } });
          break;
        // 不是新用户
        case "4":
          this.$NotNewUserPublicDialog();
          break;
        default:
          this.$Toast("体验金状态异常，请稍候再试");
          break;
      }
    },
  }
}
</script>

<style lang="less" scoped>
.enjoy-money {
  background: #eee;
  position: relative;
  border-radius: 15px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    display: block;
    width: 66px;
    height: 66px;
    background: url("../../../assets/images/gold.png") no-repeat;
    background-size: 100% 100%;
  }

  &::before {
    left: -23px;
    top: 130px;
    transform: scaleX(-1);
  }

  &::after {
    right: 0px;
    top: -33px;
  }
}

.item {
  min-height: 455px;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
  border-radius: 15px;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 28px;
    height: 28px;
    background: #ffe5bc;
    border-radius: 50%;
    position: absolute;
    top: 80px;
  }

  &::before {
    left: -14px;
  }

  &::after {
    right: -14px;
  }
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 34px;
    text-align: center;
    margin-top: 40px;
  }

  .money {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e74e17;
    height: 150px;
    span {
      position: relative;
      left: 10px;
      font-size: 80px;
      font-family: has_buy;
      line-height: 100%;
      &::before {
        content: "￥";
        font-size: 45px;
        position: absolute;
        left: -40px;
        bottom: -3px;
      }
    }
  }

  .tags {
    display: flex;
    justify-content: center;
    opacity: 0.8;
    span {
      font-size: 22px;
      border: 1.1px solid #e74e17;
      color: #e74e17;
      border-radius: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 10px;
      margin: 0 5px;
    }
  }
}

.item-btn {
  padding: 30px 28px 41px;
}
</style>
