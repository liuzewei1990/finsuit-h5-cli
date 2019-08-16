<template>
  <div class="share-qrcode">
    <div class="txt">
      <h5>我正在{{$store.state.APP_FLAG=="BC"?"比财":"拼财"}}参加每日一题活动</h5>
      <p>答对有奖<i class="icon"></i></p>
      <span>你也赶快来参加吧～</span>
    </div>
    <div id="qrcode" class="qrcode" ref="qrcode">
      <img :src="qrcodeSrc" alt="">
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode"
console.log(QRCode);

export default {
  data () {
    return {
      qrcodeSrc: "",

    }
  },
  mounted () {
    this.createQrcode();
  },
  methods: {
    async createQrcode () {
      let url;
      if (this.$store.state.APP_FLAG == "PC") {
        if (this.$browser.OS === "Android") {
          url = 'https://android.myapp.com/myapp/detail.htm?apkName=com.pc.finance&apkCode=108';
        } else {
          url = 'https://itunes.apple.com/app/id1450232395?mt=8';
        }
      } else {
        url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.bs.finance&from=singlemessage";
      }
      this.qrcodeSrc = await QRCode.toDataURL(url, { margin: 2 });
    }
  }
}
</script>

<style lang="less" scoped>
.share-qrcode {
  padding: 30px 50px 50px;
  box-sizing: border-box;
  background: #3990ff;
  display: flex;
  color: #fff;

  .txt {
    flex: 1;
    h5 {
      font-size: 30px;
      margin-bottom: 30px;
    }
    p {
      display: block;
      font-size: 26px;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        width: 28px;
        height: 32px;
        background: url("../../../assets/images/box.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 5px;
      }
    }
    span {
      font-size: 26px;
    }
  }

  .qrcode {
    width: 156px;
    height: 156px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
