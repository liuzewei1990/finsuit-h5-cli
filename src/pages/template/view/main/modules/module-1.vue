<template>
  <div class="module-a pad-30">
    <h2>基本功能演示</h2>
    <Button type="primary" @click.native="$Toast('我是提示信息')">Toast</Button>
    <Button type="primary" @click.native="showLoading">Loading</Button>
    <Button type="primary" @click.native="$iosAlert({title:'你是小猪吗？',okText:'是'})">iosAlert</Button>
    <Button type="primary" @click.native="$bcBridge.openWebview('https://www.baidu.com')">打开网页</Button>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
export default {
    components:{ Button },
    data(){
        return{
            loading:this.$Loading("加载中...")
        }
    },
    methods:{
        showLoading(){
            if(this.loading.isShow) return;
            this.loading.show();
            console.log(this);
            this.loading.close(3000);
        },
    }
}
</script>

<style lang="less" scoped>
.module-a{}
</style>
