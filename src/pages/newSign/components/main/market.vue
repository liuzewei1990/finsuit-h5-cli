<template>
  <div class="main-market" v-show="list.length">
    <MainTitle :title="title" />
    <div class="market-box dev">
      <!-- 小于等于两条时 展示宽版，大于两条时展示，前两条宽版，剩余窄版 -->
      <div class="item dev" :class="(list.length === 2 || index === 0)?'item-max':'item-min'" v-for="(item,index) in list" :key="index" @click="clickItem(item,index)" v-track:ACB0F008.click="()=>{}">
        <img :src="$Config.aliyuncHost + item.ACT_IMG_URL" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from "@newSign/components/common/MainTitle/index.vue"
export default {
  components: { MainTitle },
  created () {
    this.getActivityList();
  },
  data () {
    return {
      // 模块标题
      title: "",
      // 活动列表
      list: [],
      // 当前点击item
      currClickItem: {},
      APP_FLAG: sessionStorage.getItem("APP_FLAG"),
      clickItemLoading: this.$Loading()
    }
  },
  methods: {
    // 获取活动列表
    async getActivityList () {
      try {
        let params = {
          ACTITY_CODE: this.$Config.actityCode,
        };
        let data = await this.$api.getActivityList(params);
        console.log("this.$api.getActivityList", data);
        if (this.$utils.isObject(data)) {
          this.title = data.ACTIVITY_FIELD_CONFIG;
          let list = data.FIELD_DATA || [];
          list.sort((a, b) => a.ACTIVITY_FIELD_SORT - b.ACTIVITY_FIELD_SORT);
          this.list = list;
        } else {
          this.$Toast("getActivityList api data error");
        }
      } catch (error) {
        console.error("getActivityList", error);
      }
    },

    // 点击活动跳转链接
    clickItem (item, index) {
      // 如果没有IMG_LINK_URL 链接地址 判定为最后一个不可点击
      if (!item.IMG_LINK_URL) return;
      if (this.clickItemLoading.isShow) return;
      this.clickItemLoading.show();
      this.currClickItem = item;
      let url = "";
      if ((item.IMG_LINK_URL + "").indexOf("http") === 0) {
        url = item.IMG_LINK_URL;
      } else {
        url = (window.location.protocol + '//' + window.location.host) + item.IMG_LINK_URL;
      }
      // 拼财和比财APP 活动跳转
      if (this.APP_FLAG === "BC" || this.APP_FLAG === "PC") {
        this.$bcBridge.openWebview(url);
      } else {
        window.location.href = url;
      }
      this.clickItemLoading.close(1000);
    }
  }
}
</script>

<style lang="less" scoped>
.main-market {
  background: #fff;
  padding: 26px;
  box-sizing: border-box;
}

.market-box {
}

.market-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    width: 100%;
    height: 100%;
  }

  .item {
    border-radius: 10px;
    overflow: hidden;
  }

  .item-max {
    width: 698px;
    height: 180px;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .item-min {
    // width: 339px;
    width: 48.5%;
    height: 180px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
}
</style>
