<template>
  <content-box title="我的专享福利" class="mar-top30" :linkIcon="false" v-show="isShow">
    <div class="enjoy-list" ref="enjoy-list">

      <template v-if="list.length > 0">
        <enjoy-list-coupon v-if="couponData" :couponData="couponData" :class="{'enjoy-item-max':list.length === 1}"></enjoy-list-coupon>
        <enjoy-list-auth v-if="authData" :authData="authData"></enjoy-list-auth>
      </template>

    </div>
  </content-box>
</template>

<script>
import ContentBox from "@enjoyNew/components/ContentBox/index.vue"
import enjoyListCoupon from "./enjoyList-coupon.vue";
import enjoyListAuth from "./enjoyList-auth.vue";
export default {
  components: { ContentBox, enjoyListCoupon, enjoyListAuth },
  data () {
    return {
      // 是否显示该模块：后台不配置则不显示
      isShow: false,
      // 现金券数据
      couponData: {},
      // 实名红包数据
      authData: {},
      // 视图loading
      // viewLoading: this.$Loading(),
      // list
      list: []
    }
  },
  mounted () {
    this.renderData();
  },
  methods: {
    async renderData () {
      try {
        // this.viewLoading.show(this.$refs["enjoy-list"]);
        let params = {};
        let data = await this.$api.getEnjoyListData(params);
        console.debug("this.$api.getEnjoyListData", data);
        if (this.$utils.isArray(data)) {
          this.list = data;
          this.isShow = this.list.length !== 0;
          // 现金券
          //   this.couponData = data.find(item => item.TYPE == "1"); find方法在安卓会报错
          this.couponData = this.arrayFind(this.list, "1");

          // 实名红包
          //   this.authData = data.find(item => item.TYPE == "2");
          this.authData = this.arrayFind(this.list, "2");
          // 更多福利...
        } else {
          this.$Toast("this.$api.getEnjoyListData data error")
        }
        // this.viewLoading.close();
      } catch (error) {
        // this.viewLoading.close();
      }
    },

    arrayFind (arr, tagetVal) {
      let res = null;
      arr.forEach(element => {
        if (element["TYPE"] == tagetVal) res = element;
      });
      return res;
    }

  }
}
</script>

<style lang="less">
.enjoy-list {
  display: flex;
  margin: 20px 0;
  justify-content: center;
  position: relative;
  min-height: 370px;
  > div {
    margin: 0 20px;
  }

  .enjoy-list-item {
    width: 290px;
    height: 370px;
    background: url("../../../assets/images/card.png") no-repeat;
    background-size: 100% 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
  .title {
    margin-top: 50px;
    height: 130px;
    color: #e74e17;
    font-size: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .title-money {
      // font-family: has_buy;
      font-size: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      // transform: scaleY(1.2);
    }
  }
  .desc {
    font-size: 24px;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .btn {
    border-radius: 500px !important;
    margin-bottom: 37px !important;
    margin-top: 10px !important;
  }

  .enjoy-item-max {
    width: 432px;
  }
}
</style>
