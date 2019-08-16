# 每日一题

> vue

## Build Setup

``` bash
# install dependencies
npm install

# 启动开发环境
npm run dev

# 发布测试包
npm run build-test

# 发布生产包
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 目录结构

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 本地测试访问方式
```
    http://192.168.137.1:7789
```
## 埋点方案
``` bash
    依赖v-track插件

    例子：
    <!-- 页面行为埋点（track-view为v-track全局注册的组件） -->
    <track-view v-track:B000A122></track-view>
    <track-view v-track:B000A122.watch="{ rest }"></track-view>
    <track-view v-track:B000A122.watch.delay="{ rest }"></track-view>
    <track-view v-if="rest" v-track:B000A122></track-view>

    <!-- 事件行为埋点（DOM） -->
    <div v-track:B000A122.click="handleClick"></div>
    <div v-track:B000A122.click="{ handleClick, item, index }"></div>
    <div v-track:B000A122.click.async="{ handleSearch, rest }"></div>
    <div v-track:B000A122.click.delay="handleClick"></div>

    <!-- 事件行为埋点（组件） -->
    <cmp v-track:B000A122.click="handleClick"></cmp>
    <cmp v-track:B000A122.[自定义事件名]="handleSearch"></cmp>
    <cmp v-track:B000A122.[自定义事件名].delay="handleSearch"></cmp>
    <cmp v-track:B000A122.[自定义事件名].async="{ handleSearch, rest }"></cmp>

    <!-- 区域展现埋点（block 可以是 DOM 或者组件） -->
    <block v-track:B000A122.show></block>
    <block v-track:B000A122.show.once></block>
    <block v-track:B000A122.show.custom="{ ref: 'scroll' }"></block>
    <block v-track:B000A122.show.custom.once="{ ref: 'scroll' }"></block>

    修饰符说明：
    .click 表示事件行为的埋点，支持自定义事件
    .watch 表示页面异步行为的埋点
    .async 配合.click指令，表示异步事件行为的埋点
    .delay 表示埋点是否延迟执行，默认先执行埋点再执行回调
    .show 表示区域曝光埋点
    .once 配合.show指令，只执行一次埋点
    .custom 配合.show指令，表示使用自定义scroll事件
```

## api统一管理
```
声明：
export const getSignInData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GET_MEMBER_FOR_H5", params, head, false, false)

调用：
let params = {}
this.$api.getSignInData(params)
```

## loading的使用
```
    第一步.创建loading实例 instance = this.$Loading() || this.$Loading("正在加载中...")
    第二步.显示loading instance.show(element) element：为可选参数 代表loading插入的位置，比如局部loading,父级需要相对定位支持
    第三步.关闭loading instance.close(timer) timer:代表延迟关闭的时间，可选参数，默认0， 
    
    获取loadingh的状态 通过实例的instance.isShow获取当前实例loading状态 true:打开 false:关闭
```

## dialog弹窗使用

```
    注意：返回dialog的vue组件
    所有选项指定则显示，不指定不现实
    let dialogComponent = this.$CommonDialog({
        <!-- 定义弹窗类型，需要在弹窗模版中定义对应类型 -->
        type: "",
        <!-- 弹窗插入的元素位置，默认为body中，可指定append元素位置，避免切换路由时弹框不销毁的问题 -->
        appendElement: document.querySelector(".main"),
        <!-- 自定义弹框内容区的class，用于对弹窗的特殊样式处理 -->
        className: "auth-dialog",
        <!-- 弹框标题 -->
        title: "您不是新用户哦",
        <!-- 弹框描述 -->
        desc: "不能领取此福利",
        <!-- 弹框内容，根据需求灵活设计，可以是图片、文字、模版， 如果图片+文字,不想做两套样式，可自行canvas合成图片统一规则 -->
        content: require("@src/assets/images/d-c-2.png"),
        <!-- 按钮文案 -->
        btnTxt: "立即抢购",
        <!-- 按钮是否禁用 -->
        btnDisabled: false,
        <!-- 按钮是否显示loading -->
        btnLoading: false,
        <!-- 底部链接文案 -->
        linkTxt: "",
        <!-- 按钮点击后触发 -->
        btnCallback: () => {
            <!-- 点击后禁用按钮 -->
            dialogComponent.btnDisabled = true;
            <!-- 修改组件的按钮文字 -->
            dialogComponent.btnTxt = "已抢购";
        },
        <!-- 链接点击后触发 -->
        linkCallback: () => {

        }
    });

    以上为公共选项，个别选项详见CommonDialog组件包中核心文件的props

    <!-- 触发关闭弹窗 -->
    dialogComponent.close();
```

## 每日一题活动url页面地址说明（19-8-9更新）
    页面nginx路径：https://xxxxxx.bicai365.com/topic/index.html

    拼财和比财APP端url地址：
        活动首页：https://xxxxxx.bicai365.com/topic/index.html#/
        URL参数：
        1、__with_login__=1 （必填）

        
    小程序端页面url地址：
        暂不投放，如果投放需要做兼容。


    站外url地址：
        活动首页：https://xxxxxx.bicai365.com/topic/index.html#/
        站外分享落地页：https://xxxxxx.bicai365.com/topic/index.html#/shareLink
        【URL参数】
        1、FROM_APP_FLAG=PC (站外标识，拼财PC或比财BC)