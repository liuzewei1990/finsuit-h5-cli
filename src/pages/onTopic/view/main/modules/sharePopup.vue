<template>
  <popup v-model="show" position="bottom" :show-mask="true" :hide-on-blur="true" :is-transparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <div class="box">
      <div class="content">
        <div class="content-item" @click="clickShare(item)" v-for="(item,index) in btns" :key="index" v-track:ACB0I010.click.native="()=>{}">
          <i :class="SHARE_PLACE_TYPE[item.SHARE_PLACE].icon"></i>
          <span>{{SHARE_PLACE_TYPE[item.SHARE_PLACE].name}}</span>
        </div>
      </div>
      <div class="btn" @click="show=false">
        取消
      </div>
    </div>
  </popup>
</template>

<script>
import Popup from "@onTopic/components/Popup"
import bus from "@onTopic/utils/bus.js"
// 分享微信小程序封面图
// import xcxShare from "./images/xcxShare.png"
// 分享到朋友圈图片 -> 拼财二维码
// import sharetopc from "./images/sharetopc.png"
// 分享到朋友圈图片 -> 比财二维码
// import sharetobc from "./images/sharetobc.png"

export default {
  components: { Popup },
  data () {
    return {
      show: false,
      // 按钮列表
      btns: [],

      // 用户点击了哪个分享渠道
      currClickShareBtn: {},

      // btn类型
      SHARE_PLACE_TYPE: {
        "0": {
          name: "微信",
          tName: "好友",
          icon: "icon-wechat"
        },
        "1": {
          name: "朋友圈",
          tName: "朋友圈",
          icon: "icon-wechat-circle"
        },
        "2": {
          name: "QQ",
          tName: "QQ好友",
          icon: "icon-wechat-circle"
        },
        "3": {
          name: "QQ空间",
          tName: "QQ空间",
          icon: "icon-wechat-circle"
        }
      },

      shareApiLoading: this.$Loading(),
      shareBtnLoading: this.$Loading(),
    }
  },
  methods: {
    open () {
      this.show = true;
      this.btns.length === 0 && this.getShareBtn();
      window.sharedResult = this.sharedResult;
    },
    close () {
      this.show = false;
    },
    // 获取分享btn数据
    async getShareBtn () {
      try {
        if (this.shareApiLoading.isShow) return;
        this.shareApiLoading.show();
        let params = {
          APP_PLACE: "2",
          ACTITY_CODE: this.$Config.actityCode,
        }
        let data = await this.$api.getShareBtn(params);
        this.shareApiLoading.close();
        console.log("this.$api.getShareBtn---------", data);
        this.btns = data || [];
      } catch (error) {
        this.shareApiLoading.close();
      }
    },

    // clickShare
    clickShare (item) {
      if (this.shareBtnLoading.isShow) return;
      this.shareBtnLoading.show();
      // 分享方式 0:图片   1:链接  2: 小程序
      const SHARE_TYPE = item.SHARE_TYPE;
      // 分享链接 链接 或者 图片地址
      const SHARE_URL = item.SHARE_URL;
      // 图片专用 0：小程序地址  1：二维码地址  全连接
      const SHARE_PIC_TYPE = item.SHARE_PIC_TYPE;
      // 分享渠道 0:分享给朋友  1:分享到朋友圈  
      const SHARE_PLACE = Number(item.SHARE_PLACE);

      // 记录当前点击的分享按钮
      this.currClickShareBtn["SHARE_TYPE"] = SHARE_TYPE;
      this.currClickShareBtn["SHARE_URL"] = SHARE_URL;
      this.currClickShareBtn["SHARE_PIC_TYPE"] = SHARE_PIC_TYPE;
      this.currClickShareBtn["SHARE_PLACE"] = SHARE_PLACE;

      switch (SHARE_TYPE) {
        case "0":
          this.close();
          // 弹出样本弹窗 - 生成要分享的图片
          bus.$emit("openShareImage", {
            btnText: `分享图片给${this.SHARE_PLACE_TYPE[SHARE_PLACE].tName}`
          })
          // 接受shareImage组件回传的base64
          bus.$on("shareImageBtnClick", base64 => {
            this.shareImageTo(SHARE_PLACE + 1, base64);
          })
          break;
        case "1":
          // 注意： SHARE_PLACE 对应sdk标识需要+1 -> 1微信好友，2朋友圈，3 qq，4qq空间
          this.shareLinkTo(SHARE_PLACE + 1, "每日一题，答对有奖", "每日一题，你学习，我买单", SHARE_URL);
          break;
        case "2":
          // 注意： 对应sdk标识需要+1 -> 1微信好友，2朋友圈，3 qq，4qq空间
          this.sharePmpTo(SHARE_PLACE + 1, 0, "pages/index/index?source=" + this.$store.state.APP_FLAG + '&rand=' + Math.random() * 10, "拼财小程序", "拼财小程序分享content", SHARE_URL);
          break;
      }

      this.shareBtnLoading.close(1000);
    },

    /**
     * 分享图片类型到 指定渠道
     * @param {Str} SHARE_PLACE     私有域参数
     * @param {Url} IMG_SRC         公共域参数
     */
    async shareImageTo (SHARE_PLACE = 1, IMG_SRC) {
      try {
        // let imgUrl = this.$Config.aliyuncHost + IMG_SRC; IMG_SRC为图片类型时，后台配置全连接
        let imgUrl = IMG_SRC;
        let maxImgBase64 = await this.$utils.toBase64(imgUrl);
        let minImgBase64 = await this.$utils.toBase64(imgUrl, 10);
        let img = maxImgBase64.split("base64,")[1];
        let thumb = minImgBase64.split("base64,")[1];
        let params = {};
        params["type"] = SHARE_PLACE;
        params["img"] = window.android ? maxImgBase64 : img;
        params["thumb"] = window.android ? maxImgBase64 : thumb;
        this.$bcBridge.h5ShareImage(params);
      } catch (error) {
        console.error(error);
        this.$Toast("shareImageTo function error")
      }
    },

    // 分享链接到 指定渠道
    async shareLinkTo (SHARE_PLACE = 1, TITLE = "", CONTENT = "", URL = "") {
      try {
        let params = {};
        params["share_type"] = SHARE_PLACE;
        params["share_title"] = TITLE;
        params["share_msg"] = CONTENT;
        params["share_url"] = URL;
        // params["icon"] = URL; // 小程序的base64
        this.$bcBridge.h5Share(params);
      } catch (error) {
        console.error(error);
        this.$Toast("shareLinkTo function error")
      }
    },

    // 分享小程序到 指定渠道
    async sharePmpTo (SHARE_PLACE = 1, type = 0, path = "", title = "", description = "", IMG_SRC = "") {
      try {
        let imgUrl = this.$Config.aliyuncHost + IMG_SRC; // 分享小程序banner是半链接
        let maxImgBase64 = await this.$utils.toBase64(imgUrl, 2); // 尺寸除以2 否则图片过大
        let minImgBase64 = await this.$utils.toBase64(imgUrl, 10);
        let img = maxImgBase64.split("base64,")[1];
        let thumb = minImgBase64.split("base64,")[1];
        let params = {
          share_type: SHARE_PLACE,
          type: type,
          url: window.location.href,
          user_name: "gh_96b686a39354",
          path: path,
          title: title,
          description: description,
          img: img,
          thumb: window.android ? img : thumb // 缩略图
        };
        this.$bcBridge.h5ShareWXProgram(params);
      } catch (error) {
        console.error(error);
        this.$Toast("sharePmpTo function error")
      }
    },

    // 分享回调 APP调用
    sharedResult (res) {
      this.show = false;
      window.sharedResult = null;
      bus.$emit("shareSuccess", this.currClickShareBtn);
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.box .content {
  display: flex;
  flex: 1;
  background: #fff;
  overflow-y: auto;

  .content-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 20px;

    i {
      font-size: 80px;
      &::before {
        color: #03be02;
      }
    }
    span {
      font-size: 30px;
      margin: 5px 0;
    }
  }
}

.box .btn {
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin-top: 4px;
  background: #fff;
  font-size: 30px;
}
</style>
