<template>
  <div class="one-topic-radio">

    <!-- 有题目 -->
    <template v-if="isHaveTopic === true">
      <!-- 题目标题 -->
      <div class="header">
        <h4>{{topicTitle}}</h4>
      </div>

      <!-- 题目选项 -->
      <div class="main" :class="animetaCssShake">
        <Checker v-model="topicValue" type="radio" :radio-required="true" default-item-class="checker-item" :selected-item-class="isCorrect?'checker-item-selected':'checker-item-selected-error'" disabled-item-class="checker-item-disabled">
          <CheckerItem v-for="(item,i) in topicOptions" :key="i" :value="item" :disabled="item.disabled">
            <div class="item">
              <p class="title">{{item.ITEM_KEY}}. {{item.ITEM_VALUE}}</p>
              <i class="icon"></i>
            </div>
          </CheckerItem>
        </Checker>

        <!-- 禁用遮罩层-->
        <div class="disabled-mask" v-show="disabledTopic"></div>
      </div>

      <!-- 底部按钮和答案解析 -->
      <div class="footer">
        <Button v-show="disabledBtn === false" type="primary" :disabled="showLoading" :show-loading="showLoading" @click.native="$checkLogin({action:btnConfirm})" v-track:ACB0I003.click.native="()=>{}">提交答案</Button>
        <EllipsisText v-if="disabledBtn === true && topicDescTextIsShow===true && topicDescText" :text="topicDescText" clamp="2"></EllipsisText>
      </div>
    </template>

    <!-- 无题目 -->
    <template v-if="isHaveTopic === false">
      <div class="no-topic-data">
        <img :src="require('./no-topic.png')" alt="">
        <h3>题目更新中，稍候再来吧~</h3>
      </div>
    </template>

  </div>
</template>

<script>
import { Checker, CheckerItem } from "@onTopic/components/Checker";
import EllipsisText from "@onTopic/components/EllipsisText"
import Button from "@onTopic/components/Button"
export default {
  components: { Checker, CheckerItem, Button, EllipsisText },
  props: {
    // 题目标题
    topicTitle: String,
    topicDescText: String,
    topicDescTextIsShow: Boolean,
    showLoading: Boolean,
    isHaveTopic: {
      default: ""
    },

    // 题目选项
    topicOptions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 题目选项序号
      orderNum: "ABCDEFG",
      // 当前选中答案
      topicValue: {},
      // 当前选中答案是否正确
      isCorrect: true,
      // 是否隐藏答题按钮
      disabledBtn: false,
      // 是否禁用答题
      disabledTopic: false,
      // 检测未选择时动画class
      animetaCssShake: ""
    }
  },

  methods: {
    // init 重置每日一题
    reset () {
      this.topicValue = {};
      this.isCorrect = true;
      this.disabledBtn = false;
      this.disabledTopic = false;
      for (let index = 0; index < this.topicOptions.length; index++) {
        const element = this.topicOptions[index];
        element.disabled = false;
      }
    },

    /**
     * 每日一题答题结束
     * topicValue:答题结果
     * isCorrect:答案是否正确
     * indexCorrect:是否显示正确答案，如果给了正确答案的索引则显示，不给不显示。
     */
    topicOver (topicValue = {}, isCorrect = true, indexCorrect) {
      this.disabledTopic = true;
      this.disabledBtn = true;
      this.topicValue = topicValue;

      // 回答正确
      if (isCorrect === true) {
        this.isCorrect = true;
      }

      // 回答错误 显示正确的答案 借用组件的disabled样式。
      if (isCorrect === false) {
        this.isCorrect = false;
        if (indexCorrect !== undefined) this.topicOptions[indexCorrect].disabled = true;
      }
    },


    // 提交按钮点击
    btnConfirm () {
      let topicValue = JSON.parse(JSON.stringify(this.topicValue));
      this.isEmptyAnimeta(topicValue);
      this.$emit("btnConfirm", topicValue)
    },

    // 检测未选择时动画特效
    isEmptyAnimeta (topicValue) {
      if (Object.keys(topicValue).length === 0) {
        this.animetaCssShake = "shake";
        setTimeout(() => {
          this.animetaCssShake = "";
        }, 500);
      }
    }
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
    margin: 20px 0;
  }

  .footer {
  }

  .no-topic-data {
    text-align: center;
    color: #999;
    img {
      width: 162px;
      height: 168px;
      margin: 30px auto;
    }
  }
}
.checker-item {
  min-height: 58px;
  padding: 10px 0;
  background: #ebf2f9;
  margin: 20px 5px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  border: 1px solid #fff;

  .item {
    width: 100%;
    display: flex;
    padding: 0 40px;
    box-sizing: border-box;
    align-items: center;

    .title {
      font-size: 26px;
      flex: 1;
      color: #444;
    }

    .icon {
      width: 28px;
      height: 28px;
      background-color: #ccc;
      border-radius: 50%;
      overflow: hidden;
      background-image: url("./radio-1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-left: 10px;
    }
  }
}

// 选中状态
.checker-item-selected,
.checker-item-disabled {
  border: 1px solid #396ffe;
  box-shadow: 0px 0px 6px #396ffe;
  background: #fff;
  .item {
    .title {
      color: #396ffe;
    }

    .icon {
      background-image: url("./radio-2.png");
    }
  }
}

// 选中状态 - 错误
.checker-item-selected-error {
  border: 1px solid #ec1111;
  box-shadow: 0px 0px 6px #ec1111;
  background: #fff;
  .item {
    .title {
      color: #ec1111;
    }

    .icon {
      background-image: url("./radio-3.png");
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
  background: rgba(255, 255, 255, 0.1);
}

// 抖动动画
.shake {
  animation: shake 0.75s;
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
</style>
