<template>
  <mask-box v-model="maskBox" :show-loading="false" :isTransparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <div class="box">
      <!-- 实物奖品 -->
      <div class="content dev" v-if="prize.type != '1'">
        <!-- 通用内容 -->
        <p class="content-title ellipsis dev">获得{{prize.title}}</p>
        <div class="content-img dev" :style="{backgroundImage:`url(${prize.img})`}"></div>

        <!-- 小程序展示 -->
        <div class="content-block sw-pmp" v-if="APP_FLAG == 'PMP'">
          <p class="content-tip dev">请联系客服领取奖励</p>
          <p v-copy="wx" v-copy:callback="copyText" class="content-wx dev">客服微信：{{wx}} <i>复制</i></p>
          <!-- <div class="content-share-btn" @click="clickHistoryBtn" v-if="isMaxPrize === true">查看我的奖品</div> -->
          <div class="content-share-btn" @click="clickDowloadHelpUrl">查看下载流程</div>
          <p class="content-tip2 dev"><span>下载拼财app领取奖励</span></p>
        </div>

        <!-- 拼财APP展示 -->
        <div class="content-block sw-pc" v-if="APP_FLAG == 'PC'">
          <p class="content-tip dev">请联系客服领取奖励</p>
          <p v-copy="wx" v-copy:callback="copyText" class="content-wx dev">客服微信：{{wx}} <i>复制</i></p>
          <div class="content-share-btn" @click="clickHistoryBtn" v-if="isMaxPrize">查看我的奖品</div>
          <div class="content-share-btn" @click="clickShareBtn" v-track:ACB0F003.click="()=>{}" v-else>分享获得抽奖机会</div>
        </div>

        <!-- 比财APP展示 -->
        <div class="content-block sw-bc" v-if="APP_FLAG == 'BC'">
          <p class="content-tip dev">请联系客服领取奖励</p>
          <p v-copy="wx" v-copy:callback="copyText" class="content-wx dev">客服微信：{{wx}} <i>复制</i></p>
          <div class="content-share-btn" @click="clickHistoryBtn" v-if="isMaxPrize">查看我的奖品</div>
          <div class="content-share-btn" @click="clickShareBtn" v-track:ACB0F003.click="()=>{}" v-else>分享获得抽奖机会</div>
        </div>
      </div>

      <!-- 红包奖品 -->
      <div class="content dev" v-if="prize.type == '1'">
        <!-- 通用内容 -->
        <p class="content-title ellipsis dev">获得{{prize.money}}元红包</p>
        <div class="content-img dev" :style="{backgroundImage:`url(${prize.img})`}"></div>

        <!-- 小程序展示 -->
        <div class="content-block xn-pmp" v-if="APP_FLAG == 'PMP'">
          <!-- 19.6.17注释 -->
          <!-- <p class="content-tip dev"><span>请下载比财APP领取奖励</span></p>
          <div class="content-share-btn" @click="clickHistoryBtn">查看我的奖品</div> -->
          <!-- 19.6.17新增 -->
          <div class="content-share-btn" @click="clickDowloadHelpUrl">查看下载流程</div>
          <p class="content-tip dev"><span>下载拼财app领取奖励</span></p>
        </div>

        <!-- 拼财APP中展示 -->
        <div class="content-block xn-pc" v-if="APP_FLAG == 'PC'">
          <div class="content-share-btn" @click="clickHistoryBtn" v-if="isMaxPrize">查看我的奖品</div>
          <div class="content-share-btn" @click="clickShareBtn" v-track:ACB0F003.click="()=>{}" v-else>分享获得抽奖机会</div>
        </div>

        <!-- 比财APP中展示 -->
        <div class="content-block xn-bc" v-if="APP_FLAG == 'BC'">
          <div class="content-share-btn" @click="clickHistoryBtn" v-if="isMaxPrize">查看我的奖品</div>
          <div class="content-share-btn" @click="clickShareBtn" v-track:ACB0F003.click="()=>{}" v-else>分享获得抽奖机会</div>
        </div>
      </div>
    </div>
  </mask-box>
</template>

<script>
import MaskBox from "@newSign/components/common/MaskBox.vue"
import { copy } from "@newSign/utils/directives/v-copy.js"
export default {
  components: { MaskBox },
  directives: {
    copy
  },
  data () {
    return {
      maskBox: false,
      // 是否是大奖弹窗
      isMaxPrize: false,
      // 奖品信息
      prize: {
        type: "",
        title: "",
        img: "",
        money: "0.00"
      },
      // 客服微信号 用来复制
      wx: "bicaikefu",
      APP_FLAG: sessionStorage.getItem("APP_FLAG")
      // APP_FLAG: "PC"
    }
  },
  methods: {

    // 打开弹窗
    open (hitPrize, hitPrizeResources, isMaxPrize = false) {
      this.prize.type = hitPrize.PRIZE_TYPE; // 0-券类 1-红包类 2-虚拟卡密类 3-实物类 4-话费充值)
      this.prize.title = hitPrize.PRIZE_NAME;
      this.prize.img = this.$Config.aliyuncHost + hitPrize.PRIZE_FRONT_IMG;
      this.prize.money = hitPrizeResources.GIFT_MONEY;
      this.isMaxPrize = isMaxPrize;
      this.maskBox = true;
    },

    // 关闭弹窗
    close () {
      this.maskBox = false;
    },

    // 复制客服微信号
    copyText (text) {
      this.$Toast("复制成功")
    },

    // 点击分享按钮
    clickShareBtn () {
      this.close();
      this.$emit('onClickShare');
    },

    // 点击查看我的中奖纪录
    clickHistoryBtn () {
      this.close();
      setTimeout(() => {
        this.$router.push('/history');
      }, 200);
    },

    // 点击 查看下载流程 按钮跳转下载帮助页面
    clickDowloadHelpUrl () {
      this.close();
      setTimeout(() => {
        this.$router.push('/dowloadAppHelp');
      }, 200);
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 658px;
  height: 771px;
  background: url("./images/prize-bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  margin-top: 100px;
}

.content {
  width: 412px;
  // height: 441px;

  margin: 238px auto 0;
  color: #f9fff2;
  text-align: center;
  font-size: 28px;
}

.content-title {
  font-size: 30px;
  height: 40px;
}

.content-img {
  display: block;
  width: 251px;
  height: 150px;
  margin: 40px auto 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom;
  background-color: #fff;
  border-radius: 10px;
}

// 弹框内容盒子
.content-block {
  margin-top: 80px;
  overflow: hidden;
  //   border: 1px solid yellow;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-tip {
  //   margin-top: 20px;
  font-size: 24px;
}

.content-share-btn {
  width: 323px;
  height: 58px;
  border-radius: 10px;
  background: #ffde2b;
  color: #da4937;
  text-align: center;
  margin: 0px auto 0;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.content-wx {
  font-size: 24px;
  //   margin-top: 10px;
  i {
    display: inline-block;
    width: 76px;
    height: 36px;
    border-radius: 18px;
    line-height: 36px;
    background: #fff;
    color: #c52814;
    font-size: 22px;
    margin-left: 10px;
  }
}

.hidden-ipt {
  position: absolute;
  left: 0;
  top: -1000px;
  opacity: 0;
  z-index: -1;
}

// content-box在 实物奖品 - app中 样式定义
.sw-pc,
.sw-bc {
  .content-tip {
  }
  .content-wx {
    margin-top: 10px;
  }
  .content-share-btn {
    margin-top: 25px;
  }
}

// content-box在 虚拟奖品 - app中 样式定义

.xn-pc,
.xn-bc {
  .content-tip {
  }
  .content-wx {
  }
  .content-share-btn {
  }
}

// content-box在 实物奖品 - 小程序中 样式定义

.sw-pmp {
  .content-tip {
  }
  .content-wx {
    // margin-top: 10px;
  }
  .content-share-btn {
    margin-top: 20px;
  }
  .content-tip2 {
    margin-top: 10px;
    font-size: 20px;
  }
}

// content-box在 虚拟奖品 - 小程序中 样式定义

.xn-pmp {
  .content-tip {
    margin-top: 25px;
  }
  .content-wx {
  }
  .content-share-btn {
    // margin-top: 25px;
  }
}
</style>
