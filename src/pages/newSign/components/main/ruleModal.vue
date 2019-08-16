<template>
  <mask-box v-model="maskBox" :show-loading="false" :isTransparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <div class="box">
      <div class="content">
        <p v-text="ruleText"></p>
      </div>
    </div>
  </mask-box>
</template>

<script>
import MaskBox from "@newSign/components/common/MaskBox.vue"
export default {
  components: { MaskBox },
  data () {
    return {
      maskBox: false,
      ruleText: ""
    }
  },
  methods: {
    open () {
      this.maskBox = true;
      this.getData();
    },

    // 获取规则文案
    async getData () {
      if (this.ruleText !== "") return;
      let param = {
        ACTITY_CODE: this.$Config.actityCode,
        OFFICIAL_CODE: 'SINGINF_NOTICE'
      };
      let data = await this.$api.getRule(param);
      this.ruleText = data.MASTER_OFFICIAL || "";
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 472px;
  height: 603px;
  background: url("./images/rule-box.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  margin-top: 100px;
}

.content {
  width: 432px;
  height: 441px;
  margin: 128px auto 0;
  color: #f9fff2;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 26px;
  -webkit-overflow-scrolling: touch;
  padding: 15px;
  box-sizing: border-box;

  // 排版间距
  //   letter-spacing: 1px;
  line-height: 35px;
  text-align: justify;
  white-space: pre-line;
}
</style>
