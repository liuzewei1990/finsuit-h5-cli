<template>
  <div class="one-topic-radio">

    <!-- 有题目 -->
    <template v-if="isHaveTopic === true">
      <!-- 题目标题 -->
      <div class="header">
        <h4>{{topicTitle}}</h4>
      </div>

      <!-- 题目选项 -->
      <div class="main">
        <Checker v-model="topicValue" type="radio" :radio-required="true" default-item-class="checker-item" selected-item-class="checker-item-selected" disabled-item-class="checker-item-disabled">
          <CheckerItem v-for="(item,i) in topicOptions" :key="i" :value="item" :disabled="item.disabled">
            <div class="item">
              <i class="icon"></i>
              <p class="title">{{item.ITEM_KEY}}. {{item.ITEM_VALUE}}</p>
            </div>
          </CheckerItem>
        </Checker>

        <!-- 禁用遮罩层-->
        <div class="disabled-mask" v-show="isShare"></div>
      </div>
    </template>

    <!-- 无题目 -->
    <template v-if="isHaveTopic === false">
      <div class="no-topic-data">
        <p>为使小财主更加系统、全面的了解直销银行 熟悉比财平台、掌握理财知识、开心赚取收 益，欢迎来“理财小课堂”参与答题，答对即 可领取丰厚奖励！</p>
      </div>
    </template>

    <!-- 底部按钮和答案解析 -->
    <div class="footer">
      <Button class="btn" v-show="isShare === false" type="primary" :disabled="false" :show-loading="false" @click.native="$checkLogin({action:btnConfirm})" v-track:ACB0I013.click.native="()=>{}">下载参与</Button>
    </div>

  </div>
</template>

<script>
import { Checker, CheckerItem } from "@onTopic/components/Checker";
import Button from "@onTopic/components/Button"
export default {
  components: { Checker, CheckerItem, Button },
  props: {
    // 题目标题
    topicTitle: String,
    isHaveTopic: {
      type: Boolean,
      default: ""
    },

    // 题目选项
    topicOptions: {
      type: Array,
      default () {
        return []
      }
    },

    // 页面被分享-生成图片时禁用标识
    isShare: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 当前选中答案
      topicValue: {}
    }
  },

  methods: {
    // 提交按钮点击
    btnConfirm () {
      this.$emit("btnConfirm")
    },
  }
}
</script>

<style lang="less" scoped>
.one-topic-radio {
  padding: 40px;
  box-sizing: border-box;

  .header {
    h4 {
      font-size: 32px;
      color: #5198ff;
      padding: 0 20px;
    }
  }

  .main {
    position: relative;
    // margin: 20px 0;
  }

  .no-topic-data {
    padding: 50px 30px;
    font-size: 28px;
    line-height: 45px;
    font-weight: 600;
  }

  .footer {
    .btn {
      border-radius: 500px;
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 50px;
        height: 30px;
        background: url("./btn-icon.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
  }
}
.checker-item {
  padding: 10px 0;
  margin: 20px 5px;
  overflow: hidden;
  display: flex;

  .item {
    width: 100%;
    display: flex;
    align-items: center;

    .title {
      font-size: 26px;
      flex: 1;
      color: #444;
    }

    .icon {
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      border: 5px solid #afcfff;
      border-radius: 500px;
      margin: 0 20px;
    }
  }
}

// 选中状态
.checker-item-selected,
.checker-item-disabled {
  .item {
    .title {
      color: #396ffe;
    }
    .icon {
      border: 7.5px solid #3786fe;
    }
  }
}
// 禁用遮罩
.disabled-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0);
}
</style>
