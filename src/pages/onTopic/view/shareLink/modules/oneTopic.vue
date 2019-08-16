<template>
  <div class="share-oneTopic">

    <!-- 标题 -->
    <banner v-show="bjImgSrc" :bjImgSrc="bjImgSrc" :titleImgSrc="titleImgSrc" :descText="descText"></banner>

    <!-- 每日一题->题目 -->
    <calendar v-show="bjImgSrc" class="mar-top">
      <topic ref="topic" :isHaveTopic="isHaveTopic" :topicTitle="topicTitle" :topicDescText="topicDescText" :topicOptions="topicOptions" @btnConfirm="btnConfirm" :isShare="isShare"></topic>
    </calendar>
  </div>
</template>


<script>
import Calendar from "@onTopic/components/Calendar"
import Banner from "@onTopic/components/Banner"
import Topic from "@onTopic/components/Topic/shareTopic.vue"
export default {
  components: { Calendar, Banner, Topic },
  props: {
    isShare: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 每日一题是否有题目
      isHaveTopic: '',

      // 荧光屏文字
      msgText: "",
      // 每日一题背景渐变色
      oneTopicBjColor: "#fff",
      // banner背景图
      bjImgSrc: "",
      // banner标题图
      titleImgSrc: "",
      // banner文案
      descText: "",
      // 题目标题
      topicTitle: "",
      // 答案解析
      topicDescText: "",
      // 答案解析是否显示
      topicDescTextIsShow: "",
      // 题目选项
      topicOptions: []
    }
  },

  mounted () {
    this.renderData()
  },

  methods: {
    async renderData () {
      let params = {};
      let data = await this.$api.getTopicInfo(params);
      console.debug("this.$api.getTopicInfo", data);

      if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
        this.$Toast(data.MSG || "数据异常 this.$api.getTopicInfo");
        return;
      }
      // banner配置信息
      let apiBannerData = data.COMMON_CONFIG_DATA || {};
      // 题目信息
      let apiTopicData = data.QUESTION_INFO || {};
      // 用户回显题目信息
      let apiUserTopicData = data.ANSWER_RESULT || {};

      this.renderBannerData(apiBannerData);
      this.renderTopicData(apiTopicData);

      // show module
      this.moduleShow = true;
    },

    // 设置banner数据
    renderBannerData (apiBannerData) {
      //  模块背景渐变前色
      let oneTopicBjColor = apiBannerData.oneTopicBjColor;
      // banner背景
      let bjImgSrc = apiBannerData.BACKGROUND_PICTURE ? this.$Config.aliyuncHost + apiBannerData.BACKGROUND_PICTURE : '';
      // banner标题图片
      let titleImgSrc = apiBannerData.FOREGROUND_PICTURE ? this.$Config.aliyuncHost + apiBannerData.FOREGROUND_PICTURE : '';
      // banner文案
      let descText = apiBannerData.AWARD_TEXT;
      // 荧光屏文字
      let msgText = apiBannerData.DOUBLE_TEXT;

      this.oneTopicBjColor = oneTopicBjColor || "#3866ff";
      this.bjImgSrc = bjImgSrc || require('@onTopic/assets/images/banner.png');
      this.titleImgSrc = titleImgSrc || require('@onTopic/assets/images/title.png');
      this.descText = descText;
      this.msgText = msgText;
    },
    // 设置每日一题数据
    renderTopicData (apiTopicData) {
      // 接口中没有题目信息
      if (Object.keys(apiTopicData).length === 0 || (apiTopicData.ITEM_LIST || []).length === 0) {
        this.isHaveTopic = false;
        return;
      }

      this.isHaveTopic = true;
      // 题目标题
      let topicTitle = apiTopicData.QUESTION_TITLE;
      // 题目解析富文本
      let topicDescText = apiTopicData.QUESTION_ANALYSIS;
      // 题目解析富文本是否显示 0：显示；1：隐藏
      let topicDescTextIsShow = apiTopicData.QUESTION_ANALYSIS_IS_ENABLED;
      // 题目选项
      let topicOptions = apiTopicData.ITEM_LIST || [];

      this.topicTitle = topicTitle;
      this.topicDescText = topicDescText;
      this.topicDescTextIsShow = !Number(topicDescTextIsShow);
      this.topicOptions = topicOptions.map(item => {
        item["disabled"] = false;
        return item;
      });
    },

    // 点击下载app
    btnConfirm () {
      window.location.href = this.$Config.appDownloadUrl;
    }
  },
}
</script>

<style lang="less" scoped>
.share-oneTopic {
  //   min-height: 980px;
  position: relative;
  overflow: hidden;
  display: flex;
  z-index: 0;
  flex-direction: column;

  .mar-top {
    margin-top: -40px;
  }
}
</style>
