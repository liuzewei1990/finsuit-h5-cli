<template>
  <mask-box v-model="visible" :show-loading="false" :isTransparent="false" @on-show="$modalHelper.open(appendElement)" @on-hide="$modalHelper.close(appendElement)">

    <!-- 每日一题 奖励列表弹窗 -->
    <template v-if="type == 'TOPIC-LOTTERY-LIST'">
      <dialog-common-box>
        <div class="TOPIC-LOTTERY-LIST">
          <h5>{{title}}</h5>
          <p>{{desc}}</p>
          <ul class="lottery-list">
            <li class="lottery-item" v-for="(item,index) in content" :key="index">
              <cro>
                <p class="coupon-title ellipsis">{{item.couponTitle}}</p>
                <span class="coupon-content ellipsis">{{item.couponContent}}</span>
                <Button class="coupon-btn" @click.native="contentCallBack(JSON.parse(JSON.stringify(item)))">领取</Button>
              </cro>
            </li>
          </ul>
          <a class="linkTxt" href="javascript:void(0);" v-show="linkTxt" @click="linkCallback" v-track:ACB0I004.click="()=>{}">{{linkTxt}}</a>
        </div>
      </dialog-common-box>
    </template>

    <!-- 每日一题 奖励领取成功 -->
    <template v-if="type == 'TOPIC-LOTTERY-OPEN'">
      <dialog-common-box>
        <div class="TOPIC-LOTTERY-OPEN">
          <h5>{{title}}</h5>
          <p>{{desc}}</p>
          <div class="lottery-item">
            <cro>
              <p class="coupon-title ellipsis">{{content.couponContent}}</p>
              <span class="coupon-content ellipsis">{{content.couponTitle}}<span class="is-double" v-show="isDouble">x2</span></span>
              <a class="coupon-btn" href="javascript:void(0);" @click="contentCallBack" v-track:ACB0I005.click="()=>{}">去钱包查看</a>
            </cro>
            <i class="is-fb" v-show="isDouble">翻倍</i>
          </div>
          <a class="linkTxt" href="javascript:void(0);" v-show="linkTxt" @click="linkCallback" v-track:ACB0I004.click="()=>{}">{{linkTxt}}</a>
        </div>
      </dialog-common-box>
    </template>

    <!-- 每日一题 回答错误弹窗 -->
    <template v-if="type == 'TOPIC-USER-ERROR'">
      <dialog-common-box>
        <div class="TOPIC-USER-ERROR">
          <h5>{{title}}</h5>
          <div class="content">
            <img :src="content" alt="">
          </div>
          <p class="linkTxt">{{linkTxt}}</p>
          <Button class="btnTxt" @click.native="btnCallback">{{btnTxt}}</Button>
        </div>
      </dialog-common-box>
    </template>

    <!-- 每日一题 活动规则弹窗 -->
    <template v-if="type == 'TOPIC-RULE'">
      <dialog-common-box>
        <div class="TOPIC-RULE">
          <h5>{{title}}</h5>
          <div class="content" v-text="content"></div>
        </div>
      </dialog-common-box>
    </template>

    <!-- 开户有奖 活动规则弹窗 -->
    <template v-if="type == 'ACCOUNT-RULE'">
      <dialog-common-box>
        <div class="ACCOUNT-RULE">
          <h5>{{title}}</h5>
          <div class="content" v-text="content"></div>
        </div>
      </dialog-common-box>
    </template>

    <!-- 开户有奖 获得奖励弹窗 -->
    <template v-if="type == 'ACCOUNT-LOTTERY-OPEN'">
      <dialog-common-box>
        <div class="ACCOUNT-LOTTERY-OPEN">
          <div class="content">
            <img :src="content" alt="">
          </div>
          <h5>{{title}}</h5>
          <p class="desc">{{desc}}</p>
          <p class="linkTxt">{{linkTxt}}</p>
          <Button class="btnTxt" @click.native="btnCallback">{{btnTxt}}</Button>
        </div>
      </dialog-common-box>
    </template>

  </mask-box>
</template>

<script>
import Button from "@onTopic/components/Button"
import MaskBox from "@onTopic/components/MaskBox"
import DialogCommonBox from "./DialogCommonBox"
import Cro from "./Cro"
export default {
  components: { MaskBox, Button, DialogCommonBox, Cro },
  props: [
    // 指定哪个弹窗
    "type",
    // 弹窗dom元素插入的目标元素位置
    "appendElement",
    // 指定弹窗私有class名
    "className",
    // 显示弹窗
    "visible",
    // 弹窗大标题
    "title",
    // 弹窗子标题描述
    "desc",
    // 弹窗的内容，随意设计
    "content",
    // 弹窗内容中的按钮点击回调
    "contentCallBack",
    // 弹窗按钮通用
    "btnTxt",
    // 按钮是否禁用
    "btnDisabled",
    // 按钮loading
    "btnLoading",
    // 按钮点击回调
    "btnCallback",
    // 弹窗底部链接文案
    "linkTxt",
    // 弹窗底部文案链接
    "linkUrl",
    // 弹窗底部文案点击回调
    "linkCallback",

    // isDouble是否翻倍? 当type === TOPIC-LOTTERY-OPEN 领取成功的时候
    "isDouble"

  ],
}
</script>

<style lang="less" scoped>
@import "./TOPIC-LOTTERY-LIST.less";
@import "./TOPIC-LOTTERY-OPEN.less";
@import "./TOPIC-USER-ERROR.less";
@import "./TOPIC-RULE.less";
@import "./ACCOUNT-RULE.less";
@import "./ACCOUNT-LOTTERY-OPEN.less";
</style>
