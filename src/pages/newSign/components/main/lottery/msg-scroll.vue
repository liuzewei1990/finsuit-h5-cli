<template>
  <div class="msg-scroll">
    <transition-group tag="div" class="msg-scroll-box">
      <p v-for="(item) in list" :key="item.key" class="table">
        <span>{{ item | pohone }}</span>
      </p>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [

      ]
    };
  },
  filters: {
    pohone (item) {
      if (item && item.PHONE_NUM && item.PRIZE_NAME) {
        let phone = item.PHONE_NUM + "";
        return `${phone.slice(0, 3)}******${phone.slice(phone.length - 4, phone.length)} ${item.PRIZE_NAME}`
      } else {
        return "138****1243 腾讯视频会员";
      }
    }
  },
  mounted () {
    this.init();
  },

  methods: {

    async init () {
      let param_key = {};
      let data = await this.$api.getPrizeHistory(param_key);
      console.log("this.$api.getPrizeHistory------", data);
      if (this.$utils.isArray(data)) {
        this.list = this.createKey(data);
        this.play();
      } else {
        this.$Toast("prizeHistory data error")
      }
    },

    // 滚动函数
    play () {
      window.requestAnimationFrame(() => {
        let _cache = this.list[0];
        this.list.shift();
        this.list.push(_cache);
        setTimeout(this.play, 2500)
      });
    },

    // create
    createKey (data) {
      if (data.length <= 1) {
        let arr = [];
        for (let index = 0; index < 3; index++) {
          let item = { ...data[0] };
          item["key"] = "key" + index;
          arr.push(item)
        }
        return arr;
      } else {
        return data.map((item, index) => {
          item["key"] = "key" + index;
          return item;
        })
      }
    }
  }
};
</script>

<style scoped>
.msg-scroll {
  height: 62px;
  overflow: hidden;
}
.msg-scroll-box {
  margin-top: -62px;
}

.v-move {
  transition: transform 0.3s;
}
.msg-scroll-box p:nth-last-child(1) {
  visibility: hidden;
}
.msg-scroll-box p {
  width: 100%;
  height: 62px;
  font-size: 26px;
  text-align: center;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #fff; */
}
.msg-scroll-box p span {
  display: table-cell;
  vertical-align: middle;
}
</style>
