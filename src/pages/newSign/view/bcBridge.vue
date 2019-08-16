<template>
  <div style="padding:100px 20px;">
    <Button type="warn" @click.native="gotoSecondaryH5Page">gotoSecondaryH5Page</Button>
    <Button type="warn" @click.native="isApp">是否app</Button>
    <Button type="warn" @click.native="goLogin">跳原生登录页面</Button>
    <Button type="warn" @click.native="toPage">跳转APP页面</Button>
    <Button type="warn" @click.native="h5Share">h5Share</Button>
    <Button type="warn" @click.native="h5ShareImage">h5ShareImage</Button>
    <Button type="warn" @click.native="updateTitle">updateTitle</Button>
    <Button type="warn" @click.native="h5OpenApiBuy">h5OpenApiBuy</Button>
    <Button type="warn" @click.native="saveImgAlbumForBack">saveImgAlbumForBack</Button>
    <Button type="warn" @click.native="sendLoginResult">sendLoginResult</Button>
    <Button type="warn" @click.native="gotoMainPage">gotoMainPage跳回首页</Button>
    <Button type="warn" @click.native="h5ShareWXProgram">h5ShareWXProgram</Button>
  </div>
</template>

<script>
import Button from "@newSign/components/common/Button";
import bcBridge from "@newSign/utils/bcBridge.js";
import { Base64 } from "js-base64";

export default {
  components: { Button },
  data () {
    return {
      $bcBridge: bcBridge
    }
  },
  created () {

    console.log("bcBridge.vue", window.items)
  },


  methods: {
    isApp () {
      let res = bcBridge.isApp();
      this.$Toast(res + "")
    },

    goLogin () {
      let res = bcBridge.goLogin();
      if (res === false)
        this.$Toast("跳转失败")
    },

    toPage () {
      bcBridge.toPage("http://192.168.100.147:7788/", "nn");
    },

    h5Share () {
      let params = {
        share_type: "1", //1微信，2朋友圈，3 qq，4qq空间
        share_title: "分享标题", //分享title
        share_msg: "分享内容", //分享内容主体
        share_url: "", //分享的url
      }
      bcBridge.h5Share(params);
    },

    h5ShareImage () {
      let params = {
        type: "2",
        img: "",
        // thumb: shareImg1[1]  // 小的缩略图？
      }
      console.log(params);

      bcBridge.h5ShareImage(params);

    },

    updateTitle () {
      bcBridge.updateTitle("新的title");
    },

    h5OpenApiBuy () {
      bcBridge.h5OpenApiBuy({});
    },

    saveImgAlbumForBack () {
      bcBridge.saveImgAlbumForBack("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAArCAMAAAAKevXFAAAAUVBMVEVHcExPi+5Oiu5Pi+4+e988eN5PjO5QjO5NiuxEgeZNiexOiu1Oiu1Khur///9QjO5OiuxCgedJhuk7euL2+f7l7vtomemGre3H2ve80fSYuvBmh0GmAAAADnRSTlMAyJDpMBH0990hYaWCSKuB6ZYAAAICSURBVEjHrZbblqwgDERFFEHtBgJ4+/8PnUBfju1RSc9YPvmyVyUEUkWxUq3akkkuRHMi8RSXrGyrujhQXfWMi0afyhgAmwTQCM76A15VSqFzKGQlGkSaBaOFLKsdYy0jsJBjxjkE70OYx/gLpmHt1p4quc7C0NAw+ftbfhoiTvNSfcI6SpGfrBVPdOoD1lCcLRtWVBhTtStcXYo8zNrlvie/JHflu3ctqWf7sBeOt6/RYBTY6A9oWKyzRrPqWSehaXYI90MF47B1j1orqbM0sNP9RJPDWmU0V/ciT7ODP6P5Ac2JHs0p9mdrD3OaKdqBWu3PaT52jt+KgjJrsNwzwmOFWCrLnyjAnKPN1kHT1UX+RDVAyNEC0mLjKG2j0eKMUNp2Ke0Lb/xSb/Iabw5vPp5CdkIMaUJcnBBFmV6AkTq919wswELjzVKM8opP+UJj2wgvUtpWuRcJC03PZSX/bC5ZS68lYWPlzOFL/rJG2DJxM7vjLePjgRpWUTegOd+AcXL5O4xka000t/hDGKy2cz45JJwdw+4yRVizCSIkd/+nmtnEMkVXfZe4UhB0m8Q1D9GY2SaufBo05mHPmQXTYNQ8gktVylZ9nVSNSfcfeSvhTsakWv86RUciPFM0YIoub+owlatb3zFJFOv6k4T/Ip6r+idVIyuDI6hO34Wqiz1bP5mXnfd6JtAlAAAAAElFTkSuQmCC")
    },

    sendLoginResult () {
      bcBridge.sendLoginResult();
    },

    gotoMainPage () {
      bcBridge.gotoMainPage();
    },

    h5ShareWXProgram () {
      bcBridge.h5ShareWXProgram({

      });
    },

    gotoSecondaryH5Page () {
      this.$Toast("点击了")
      bcBridge.openWebview("http://192.168.137.1:7788/#/")

      //   bcBridge.openWebview("http://192.168.137.1:7789/#/")
    }
  }
}
</script>

<style lang="less" scoped>
</style>
