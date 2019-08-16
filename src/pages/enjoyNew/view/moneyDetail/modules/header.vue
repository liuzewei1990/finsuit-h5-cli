<template>
  <div class="header">
    <div class="box">
      <div class="cell">
        <p><span>{{rate}}</span><sub>%</sub></p>
        <span>{{rateLabel || "-"}}</span>
      </div>
      <div class="cell">
        <p><span>{{days}}</span><sub>天</sub></p>
        <span>{{daysLabel || "-"}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: [String, Number],
      default: 0
    },
    rateLabel: {
      type: [String, Number],
      default: ""
    },
    days: {
      type: [String, Number],
      default: 0
    },
    daysLabel: {
      type: [String, Number],
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 252px;
  //   background: -webkit-linear-gradient(left, #4d81fd, #4d81fd);
  //   background: -o-linear-gradient(right, #4d81fd, #4d81fd);
  //   background: -moz-linear-gradient(right, #4d81fd, #4d81fd);
  //   background: linear-gradient(to right, #4d81fd, #4d81fd);
  background: url("../../../assets/images/mask.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  padding-bottom: 50px;

  .box {
    height: 110px;
    width: 100%;
    display: flex;
  }

  .cell {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;

    p {
      span {
        width: 100%;
        font-size: 70px;
        font-family: has_buy;
        flex: 1;
      }
      sub {
        font-size: 25px;
        position: relative;
        top: -6px;
        left: 5px;
      }
    }
    span {
      font-size: 26px;
      width: 100%;
    }
  }

  .cell:first-child {
    border-right: 1px solid rgba(255, 255, 255, 0.4);
  }
}
</style>
