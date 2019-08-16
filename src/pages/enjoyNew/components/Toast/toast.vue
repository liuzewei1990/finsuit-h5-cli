<template>
  <div class="box">
    <transition name="mint-toast-pop">
      <div class="mint-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
        <i class="mint-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
        <span class="mint-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    };
  },
  computed: {
    customClass () {
      var classes = [];
      switch (this.position) {
        case 'top':
          classes.push('is-placetop');
          break;
        case 'bottom':
          classes.push('is-placebottom');
          break;
        default:
          classes.push('is-placemiddle');
      }
      classes.push(this.className);
      return classes.join(' ');
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  z-index: 999999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.mint-toast {
  position: fixed;
  max-width: 80%;
  min-width: 300px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  transition: opacity 0.2s linear;
}
.mint-toast.is-placebottom {
  bottom: 100px;
  //   left: 50%;
  //   transform: translate(-50%);
}
.mint-toast.is-placemiddle {
  //   left: 50%;
  //   top: 45%;
  //   transform: translate(-50%, -50%);
}
.mint-toast.is-placetop {
  top: 100px;
  //   left: 50%;
  //   transform: translate(-50%);
}
.mint-toast-icon {
  display: block;
  text-align: center;
  font-size: 100px;
  &:before {
    color: #fff;
  }
}
.mint-toast-text {
  font-size: 28px;
  display: block;
  text-align: center;
}
.mint-toast-pop-enter,
.mint-toast-pop-leave-active {
  opacity: 0;
}
// mint-toast is-placemiddle mint-toast-pop-enter-active mint-toast-pop-enter-to
// mint-toast is-placemiddle mint-toast-pop-leave-active mint-toast-pop-leave-to
// .mint-toast-pop-enter-active {
//   animation-duration: 0.75s;
//   animation-name: bounceIn;
// }

// .mint-toast-pop-leave-active {
//   animation-duration: 0.4s;
//   animation-name: bounceOut;
// }

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes bounceOut {
  20% {
    // -webkit-transform: scale3d(0.9, 0.9, 0.9);
    // transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
}
// @keyframes bounceOut {
//   20% {
//     -webkit-transform: scale3d(0.9, 0.9, 0.9);
//     transform: scale3d(0.9, 0.9, 0.9);
//   }

//   50%,
//   55% {
//     opacity: 1;
//     -webkit-transform: scale3d(1.1, 1.1, 1.1);
//     transform: scale3d(1.1, 1.1, 1.1);
//   }

//   to {
//     opacity: 0;
//     -webkit-transform: scale3d(0.3, 0.3, 0.3);
//     transform: scale3d(0.3, 0.3, 0.3);
//   }
// }
</style>
