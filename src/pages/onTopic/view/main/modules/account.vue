<template>
  <div class="main-banks" v-show="bankList.length >0">
    <MainTitle :title="title" :isIcon="true" @iconClick="openRuleDialog" />
    <div class="bank-list">
      <ul>
        <li v-for="(item,index) in bankList" :key="index" @click="$checkToLogin({action:handleClick,data:item})">
          <!-- openApi对接 -->
          <div class="bank-link" :class="{'default-bj-color':!item.LOGO_BACKGROUND_URL}" :style="`backgroundImage:url(${$Config.aliyuncHost + item.LOGO_BACKGROUND_URL});`" v-if="item.ORG_STATUS == '1'">
            <div class="icon">
              <img :src="$Config.aliyuncHost + item.LOGO_URL" alt="">
            </div>
            <div class="content ellipsis">
              <p class="ellipsis">{{item.ORG_NAME}}</p>
              <span>{{item.DESCRIPT}}</span>
            </div>
            <div class="btn">立即开户</div>
          </div>
          <!-- H5合作行 -->
          <div class="h5-link" v-if="item.ORG_STATUS == '2'">
            <img :src="$Config.aliyuncHost + item.H5_PIC_URL" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainTitle from "@onTopic/components/MainTitle/index.vue"
import { mapGetters } from "vuex"
export default {
  components: { MainTitle },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin () {
      this.renderData();
      this.getBankReward();
    }
  },
  data () {
    return {
      // 模块标题
      title: "开户有奖",
      bankList: [],
      bankRule: {}
    }
  },
  mounted () {
    this.renderData();
    // 如果是登录状态 调用接口查看是否有开户奖励
    this.isLogin && this.getBankReward();
  },
  methods: {
    // render
    async renderData () {
      let data = await this.$api.getBankList();
      console.debug("this.$api.getBankList", data);

      if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
        this.$Toast(data.MSG || "数据异常 this.$api.getBankList");
        return;
      }

      // 弹窗规则
      let bankRule = data.OPEN_ACCOUNT_RULE || {};
      this.bankRule = bankRule;

      // 开户银行列表
      let bankList = data.OPEN_ACCOUNT_LIST || [];
      this.bankList = bankList;
    },

    // 开户有奖 - 规则弹窗
    openRuleDialog () {
      let dialogComponent = this.$CommonDialog({
        type: "ACCOUNT-RULE",
        appendElement: this.$root.$el.querySelector("#page"),
        title: this.bankRule.RULE_TITLE,
        desc: "",
        content: this.bankRule.RULE_CONTENT
      })
    },

    // 恭喜获得开户奖励
    openLotteryDialog () {
      let dialogComponent = this.$CommonDialog({
        type: "ACCOUNT-LOTTERY-OPEN",
        appendElement: this.$root.$el.querySelector("#page"),
        title: "恭喜获得开户奖励",
        desc: "10元",
        content: require("@onTopic/assets/images/dialog-2.png"),
        btnTxt: "前往钱包",
        btnCallback: () => {
          this.$Toast("你点击了前往钱包按钮")
        }
      })
    },

    // 处理点击事件
    handleClick (bankItem) {
      if (bankItem.ORG_STATUS == "1") this.openApiBank(bankItem);
      if (bankItem.ORG_STATUS == "2") this.h5ToUrl(bankItem);
    },

    // openApi开户
    openApiBank (bankItem) {
      let params = {};
      params["ORG_ID"] = bankItem.ORG_ID;
      params["ORG_NAME"] = bankItem.ORG_NAME;
      params["LOGO_URL"] = bankItem.LOGO_URL;
      params["BANK_DOCK_TYPE"] = bankItem.BANK_DOCK_TYPE;
      params["SKIP_PAGE_INFO"] = bankItem.SKIP_PAGE_INFO
      params["BANK_TIPS_PAGE"] = "1";
      this.$bcBridge.openBankAccount(params, () => {
        // 领取奖励
        this.getBankReward(bankItem.ORG_ID);
        // 刷新数据
        this.renderData();
      });
    },

    // 领取开户奖励接口
    async getBankReward (ORG_ID = "") {
      let params = { ORG_ID: ORG_ID };
      let data = await this.$api.getBankReward(params);
      console.debug("this.$api.getBankReward", data);

      if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
        this.$Toast(data.MSG || "数据异常 this.$api.getBankReward");
        return;
      }

      let recordResult = data.RECORD_RESULT || {};

      if (recordResult.AMOUNT) {
        this.openBackRewardDialog(recordResult.AMOUNT);
      } else { }

    },

    // 领取开户奖励弹窗
    openBackRewardDialog (amount = 0) {
      let dialogComponent = this.$CommonDialog({
        type: "ACCOUNT-LOTTERY-OPEN",
        appendElement: this.$root.$el.querySelector("#page"),
        title: "恭喜获得开户奖励",
        desc: `${amount}元`,
        content: require("@onTopic/assets/images/dialog-2.png"),
        btnTxt: "前往钱包",
        btnCallback: () => {
          this.$bcBridge.toAppWalletPage();
        },
      })
    },

    // H5+链接
    h5ToUrl (bankItem) {
      this.$bcBridge.openWebview(bankItem.LINK_URL);
    }
  }
}
</script>

<style lang="less" scoped>
.main-banks {
  background: #fff;
  padding: 26px;
  box-sizing: border-box;
  .bank-list {
    ul {
      .bank-link,
      .h5-link {
        width: 100%;
        height: 160px;
        margin-bottom: 20px;
        border-radius: 10px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .default-bj-color {
        background-image: linear-gradient(
          to right,
          #ff9483,
          #fd5861
        ) !important;
      }

      .bank-link {
        display: flex;
        align-items: center;
        color: #fff;
        padding: 0 26px;
        box-sizing: border-box;

        .icon {
          width: 60px;
          height: 60px;
          background: #eee;
          border-radius: 50%;
          overflow: hidden;
          border: 6px solid #fff;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .content {
          flex: 1;
          margin: 0 26px;
          p {
            font-size: 36px;
            letter-spacing: 2px;
          }
          span {
            font-size: 24px;
          }
        }

        .btn {
          padding: 5px 15px;
          border: 1px solid #fff;
        }
      }

      .h5-link {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
