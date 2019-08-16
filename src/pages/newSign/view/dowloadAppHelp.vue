<template>
  <div class="dowload-app-help">
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: ""
    }
  },
  created () {
    this.getDowloadAppHelpData();
  },

  methods: {
    async getDowloadAppHelpData () {
      let data = await this.$api.getDowloadAppHelpData();
      console.log("this.$api.getDowloadAppHelpData", data);
      if (this.$utils.isObject(data)) {
        if ((data.PIC_URL + "").indexOf("http") === 0) {
          this.imgUrl = data.PIC_URL;
        } else {
          this.imgUrl = this.$Config.aliyuncHost + data.PIC_URL;
        }
      } else {
        this.$Toast("this.$api.getDowloadAppHelpData data error");
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dowload-app-help {
  img {
    width: 100%;
  }
}
</style>
