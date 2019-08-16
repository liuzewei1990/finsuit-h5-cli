<template>
  <div class="main-goods-up" v-show="goods.length">
    <MainTitle title="精选产品" />
    <div class="box-scroll">
      <ul class="box-list" :style="{width:`${boxWidth}px`}">
        <!-- <ul class="box-list"> -->
        <!-- item -->
        <li class="item dev" v-for="(item,index) in goods" :key="index" ref="item" @click="$checkLogin({action:getGoodsRedirectUrl,data:item})">
          <div class="item-bank dev">
            <span class="item-bank-icon dev">
              <img :src="$Config.aliyuncHost + item.ORG_LOGO" alt="">
            </span>
            <span class="item-bank-name dev">{{item.PROD_ORG}}</span>
          </div>
          <p class="item-rate dev">{{item.RATE || 0}}%</p>
          <small class="item-info dev">{{item.RATE_NAME || "无"}}</small>
          <div class="item-tags">
            <span class="tag" v-for="(tag,i) in item.tags" :key="i">{{tag}}</span>
          </div>
        </li>
        <!-- more更多 -->
        <li class="item dev" v-if="goods.length < 6">
          <div class="item-bank dev">
            <span class="item-bank-icon dev">
              <img :src="require('@onTopic/assets/images/$.png')" alt="">
            </span>
            <span class="item-bank-name dev">更多产品</span>
          </div>
          <p class="item-rate more dev">敬请期待...</p>
          <small class="item-info dev">更多银行理财产品</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainTitle from "@onTopic/components/MainTitle/index.vue"
export default {
  components: { MainTitle },
  data () {
    return {
      // 商品列表
      goods: [],
      // 点击loading
      clickItemLoading: this.$Loading(),
      // 当前点击的产品
      crrrClickItem: {}
    }
  },
  created () {
    this.getGoodsList();
  },
  computed: {
    boxWidth () {
      return this.goods.length * 290 + 290;
    }
  },
  methods: {
    // 获取精选产品列表
    async getGoodsList () {
      try {
        let params = {
          ACTITY_CODE: this.$Config.actityCode,
        }
        let data = await this.$api.getGoodsList(params);
        if (this.$utils.isArray(data)) {
          console.debug("this.$api.getGoodsList", data);
          this.handleData(data);
        } else {
          this.$Toast("getGoodsList data not array")
        }
      } catch (error) {
        console.error("获取精彩产品列表：", error);
      }
    },

    handleData (data) {
      let newData = data.splice(0, 6);
      this.goods = newData.map(item => {
        item["tags"] = this.handleTag(item.RECOMMEND_LABER);
        return item;
      })
    },

    // 处理标签规则 标签规则：单行标签文字最多为10个 双标签文字每个最多为5个 tagStr:周期灵活的，自动扣账的
    handleTag (tagStr) {
      let maxNum = 5;
      let newTags = [];
      let tags = (tagStr += "").split(/[，,]/g, 2);
      if (tags.length === 0) return newTags;
      let tag1 = tags[0];
      let tag2 = tags[1];
      // 第一个为超长标签 只显示一行 限制10个字
      if (tag1 && tag1.length > maxNum) {
        newTags.push(tag1.slice(0, 10));
      }
      //  如果两个标签相加长度大于10个
      else if ((tag1 + tag2).length > 10) {
        tag1 && newTags.push(tag1.slice(0, maxNum));
        tag2 && newTags.push(tag2.slice(0, maxNum));
      }
      // 正常
      else {
        newTags.push(tag1);
        newTags.push(tag2);
      }
      return newTags;
    },

    // 根据产品ID获取产品详情页跳转渠道
    async getGoodsRedirectUrl (item) {
      try {
        if (this.clickItemLoading.isShow) return;
        this.clickItemLoading.show();
        let params = {
          PRD_ID: item.PROD_ID
        }
        this.crrrClickItem = item; // 埋点接口上下文需要
        let data = await this.$api.getGoodsRedirectUrl(params);
        console.log("this.$api.getGoodsRedirectUrl-----------", data);
        this.clickItemLoading.close(500);
        if (!this.$utils.isObject(data)) {
          this.$Toast("getGoodsRedirectUrl api data error")
          return;
        }

        // 上架的活动
        if (data.is_enabled == "0") {
          // H5跳转
          if (data.redirect == 1) {
            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
              this.$bcBridge.openWebview(data.url);
            } else {
              window.location.href = data.url;
            }
            return;
          }
          // 原生跳转
          if (data.redirect == 2) {
            let data = {
              "LINK_TO": "PRD_DETAIL",
              "PRD_TYPE": "1",
              "PRD_ID": item.PROD_ID || '',
              //"RATEID": '' //可选参数
            };
            let base = Base64.encode(JSON.stringify(data));
            let http = this.$store.state.APP_FLAG == "BC" ? "besharp" : "pincai";
            let url = http + '://finsuit/applink?pjsonkey=' + base;
            if (window.android || window.IOSWebJSInterface || window.webkit) {
              window.location.href = url;
            } else {
              this.$Toast("该浏览器不支持跳转")
            }
          } else {
            this.$Toast("data redirect type error", data.redirect)
          }
        }
        // 下架的活动
        if (data.is_enabled == "1") {
          this.$Toast(data.msg);
          this.getGoodsList();
        }

      } catch (error) {
        this.clickItemLoading.close();
        console.error("根据产品ID获取产品详情页跳转渠道：", error);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-goods-up {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}

.box-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

.box-list {
  // width: 290px * 6;
  // display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.box-list {
  .item {
    width: 290px;
    min-height: 260px;
    background: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    padding: 30px;
    box-sizing: border-box;
    margin: 10px 15px;
    float: left;
    box-shadow: 0px 0px 8px rgba(22, 141, 255, 0.3);
  }

  .item-bank {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  .item-bank-icon {
    width: 34px;
    height: 34px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .item-bank-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 30px;
    color: #333333;
    font-weight: 600;
  }

  .item-rate {
    font-size: 48px;
    color: #eb5f48;
    font-weight: 600;
    line-height: 60px;
    margin-top: 10px;
    font-family: "has_buy";
  }

  .more {
    font-size: 35px;
  }

  .item-info {
    color: #666666;
    font-size: 20px;
  }

  .item-tags {
    display: flex;
    flex-wrap: nowrap;
    border-left: -10px;
    .tag {
      padding: 0 4px;
      font-size: 20px;
      color: #eb5f48;
      background: rgba(235, 95, 72, 0.15);
      margin-right: 10px;
      margin-top: 10px;
    }
  }

  .item-more {
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 26px;
      color: #aaa;
      line-height: 40px;
    }
  }
}
</style>
