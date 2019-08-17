<template>
  <div class="pad-30">
    <h2>用户登录拦截器演示</h2>
    <p><span>TOKEN</span>：<span>{{$store.state.TOKEN || "请先登录"}}</span></p>
    <p><span>ID</span>：<span>{{$store.state.ID  || "请先登录"}}</span></p>
    <Button type="primary" @click.native="$checkLogin({action:login,data:'123'})">{{isLogin?'已登录':'未登录'}}</Button>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
import { mapGetters } from "vuex"
export default {
    components:{ Button },
    computed: {
        ...mapGetters(["isLogin"])
    },
    methods:{
        login(data){
            this.$Toast(data)
        }
    }
}
</script>

<style lang="less" scoped>
</style>
