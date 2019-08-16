<template>
  <guide @onShareBtn="onloadApp"></guide>
</template>

<script>
import Guide from "@newSign/components/guide/index.vue";
import wx from "weixin-js-sdk";

export default {
  components: {
    Guide
  },
  created () {
    this.initShare();
  },
  methods: {
    async initShare () {

      // 带路径 https://finsuit.bicai365.com/bcsign/
      let baseUrl = this.$utils.getBaseUrl();

      let data = await this.$api.getWxSign({ POSTFIXURL: baseUrl });
      console.log("this.$api.getWxSign", data);
      let wxParam = data.wxParam;

      wx.config({
        debug: false,
        appId: wxParam.appId,
        timestamp: wxParam.timestamp,
        nonceStr: wxParam.nonceStr,
        signature: wxParam.signature,
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
      });

      wx.ready(() => {
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: this.$Config.shareTitle,
          desc: this.$Config.shareDesc,
          link: baseUrl,
          imgUrl: baseUrl + "/static/share-icon.png",
          type: "link",
          success: function (ret) { },
          cancel: function () { }
        });

        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: this.$Config.shareTitle,
          link: baseUrl,
          imgUrl: baseUrl + "/static/share-icon.png",
          success: function (ret) { },
          cancel: function () { }
        });
      });
    },

    onloadApp () {
      window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage";
    }
  }
};
</script>

<style>
</style>
