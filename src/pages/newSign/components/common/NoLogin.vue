<template>
  <div @click="login">

    <Button type="warn" class="login-btn" @click.native="isApp">登录</Button>
  </div>
</template>

<script>

import Button from "@newSign/components/common/Button";
import bcBridge from "@newSign/utils/bcBridge.js";
export default {
  components: {
    Button
  },
  methods: {
    login () {
      bcBridge.goLogin();
    }
  }
}
</script>

<style lang="less" scoped>
.login-btn {
  margin: 100px auto;
  width: 70%;
}
</style>
