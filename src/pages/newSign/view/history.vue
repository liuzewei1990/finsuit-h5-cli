<template>
  <div class="history" v-infinite-scroll="loadBottom" infinite-scroll-immediate-check="false" infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="80">
    <div class="box">
      <ul>
        <li class="item" v-for="(item,index) in list" :key="index">
          <div class="item-name">{{item.PRIZE_NAME}}</div>
          <div class="item-date">{{item.SINGIN_TIME}}</div>
          <div class="item-status item-status-success" v-if="item.IS_GRANT == 1">已发放</div>
          <div class="item-status item-status-await" v-if="item.IS_GRANT == 0" @click="show(item)">待发放</div>
        </li>
      </ul>
    </div>
    <div style="min-height:80px; overflow: hidden;">
      <Loadmore v-if="status=='请求中'" tip="努力加载中..." :showLoading="true"></Loadmore>
      <Loadmore v-if="status=='没有更多'" tip="没有更多了" :showLoading="false"></Loadmore>
      <Loadmore v-if="status=='请求失败'" tip="加载失败，点我重试" :showLoading="false" @click.native="reLoad"></Loadmore>
      <!-- <Nodata v-if="status=='暂无数据'" :imgurl="require('@newSign/assets/img/bg_empty_data.png')" content='暂无收藏记录'></Nodata> -->
    </div>
    <modal-my-prize ref="my-prize-modal"></modal-my-prize>
  </div>
</template>

<script>
import ModalMyPrize from "@newSign/components/main/myprizeModal.vue"
import * as api from "@newSign/apis"
import Toast from '@newSign/components/common/Toast'
import infiniteScroll from '@newSign/utils/vue-infinite-scroll';
import Loadmore from "@newSign/components/common/Loadmore";
export default {
  directives: { infiniteScroll },
  components: { ModalMyPrize, Loadmore },

  async beforeRouteEnter (to, from, next) {
    let params = {
      pageSize: 20,
      currentPage: 1,
      MEMBER_ID: sessionStorage.getItem("ID"),
    }
    let data = await api.getMyPrizeHistory(params);
    console.log("api.getMyPrizeHistory------", data);
    if (Object.prototype.toString.call(data) === "[object Object]" && data.retList.length > 0) {
      next(vm => {
        vm.setData(data);
      })
    } else {
      Toast("您还未中奖请尽快参与抽奖");
    }
  },

  data () {
    return {
      list: [],
      status: "",
      query: {
        pageSize: 20,
        currentPage: 1,
        MEMBER_ID: sessionStorage.getItem("ID"),
      },
    }
  },
  computed: {
    // 返回true禁用下拉加载
    infiniteDisabled () {
      return this.status == '请求中' || this.status == '没有更多' || this.status == '暂无数据';
    }
  },
  created () {
  },
  methods: {
    show (item) {
      this.$refs["my-prize-modal"].open(item);
    },
    setData (data) {
      this.list = this.list.concat(data.retList || []);
      this.changeStatus(data);
    },

    // 初次加载
    async initPage () {
      try {
        this.query.currentPage = 1;
        let data = await this.$api.getMyPrizeHistory(this.query);
        this.list = this.list.concat(data.retList || []);
        this.changeStatus(data);
      } catch (error) {
        console.error(error);
      }
    },

    //上拉加载操作
    async loadBottom () {
      if (this.infiniteDisabled) {
        return;
      };
      if (this.status == '请求失败') {
        this.reLoad();
        return;
      }
      try {
        this.query.currentPage++;
        this.status = "请求中";
        let data = await this.$api.getMyPrizeHistory(this.query);
        this.list = this.list.concat(data.retList || []);
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
      }
    },

    // 网络错误 重新加载
    async reLoad () {
      try {
        if (this.query.currentPage == 1) this.query.currentPage++;
        this.status = "请求中";
        let data = await this.$api.getMyPrizeHistory(this.query);
        this.list = this.list.concat(data.retList || []);
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
      }
    },

    // 修改请求状态
    changeStatus (data) {
      if (this.list.length === 0) {
        this.status = "暂无数据";
      } else if (this.query.currentPage >= Math.ceil(data.totalCount / this.query.pageSize)) {
        this.status = "没有更多";
      } else {
        this.status = "请求更多";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.history {
}

.box {
  .item {
    display: flex;
    align-items: center;
    height: 100px;
    border-bottom: 1px solid #eee;
    font-size: 28px;

    background: #fff;
  }

  .item > div {
    margin: 0 20px;
    box-sizing: border-box;
  }

  .item-name {
    flex: 1.2;
  }
  .item-date {
    flex: 0.8;
  }

  .item-status {
    padding: 5px 20px;
    border-radius: 5px;
  }

  // 已经发放
  .item-status-success {
    color: #eb5f48;
    background: rgba(235, 95, 72, 0.4);
  }

  // 等待发放
  .item-status-await {
    color: #fff;
    background: rgba(235, 95, 72, 1);
  }
}
</style>
