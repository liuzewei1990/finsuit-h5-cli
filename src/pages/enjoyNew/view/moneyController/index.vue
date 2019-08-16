<template>
  <div class="money-controller">

  </div>
</template>

<script>
export default {
  data () {
    return {
      enjoyMoneyId: this.$route.query["enjoyMoneyId"],
      viewLoading: this.$Loading("数据加载中...")
    }
  },
  created () {
    this.handleClick();
  },
  methods: {
    // 处理按钮点击逻辑
    async handleClick () {
      try {
        this.viewLoading.show();
        let params = {};
        let data = await this.$api.getEnjoyMoneyStatus(params);
        this.viewLoading.close();
        if (this.$utils.isObject(data)) {
          this.enjoyMoneyStatusToUrl((data.STATUS + "") || "");
        } else {
          this.$Toast("this.$api.getEnjoyMoneyStatus data error");
        }
      } catch (error) {
        this.viewLoading.close();
        this.$router.replace("/");
        console.error(error);
      }
    },

    // 根据体验金最新状态对应不同策略
    enjoyMoneyStatusToUrl (newEnjoyMoneyStatus) {
      switch (newEnjoyMoneyStatus) {
        // 未使用
        case "0":
          this.$router.replace("/moneyDetail");
          break;
        // 收益中
        case "1":
        // 体验完成，金额冻结中
        case "2":
        // 体验完成，金额解冻，已存入我的钱包
        case "3":
          this.$router.replace({ path: "/moneyResult", query: { enjoyMoneyId: this.enjoyMoneyId } });
          break;
        // 不是新用户 - 去首页
        case "4":
          this.$router.replace("/");
          break;
        default:
          this.$Toast("体验金状态异常，请稍候再试");
          this.$router.replace("/");
          break;
      }
    }
  }
}
</script>

<style>
</style>
