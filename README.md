## 比财H5活动开发架构
[TOC]
> vue

### npm命令说明

``` bash
# install dependencies
npm install

# 启动开发环境 代表启动全部微项目 并设置开发环境配置
npm run dev

# 发布测试包 打包指定的微项目 并设置测试环境配置
npm run build:test [项目名称必填]

# 发布生产包 打包指定的微项目 并设置生产环境配置
npm run build:prod [项目名称必填]

# 查看打包报告
npm run build:xxx [xxx] --report
```

### 微前端架构特点
- **项目规范 - 约束规范** ：多个微项目应用一套脚手架，一套公共库，一套公共模块，统一项目规范。
- **开发阶段 - 独立开发** ：一键启动所有微项目开发环境，支持微项目之间间接联调。独立开发所属项目包，完全解决代码冲突问题，公共模块分离；
- **发布阶段 - 独立发布** ：支持测试环境和生产环境发布，走不通配置，微项目单独打包，单独生成dist包；
- **部署阶段 - 独立部署** ：支持一键部署所有微项目生产包，支持独立项目部署，利用浏览器缓存机制，优化公共库的缓存。

### 源码目录结构
``` bash
├─common
│  ├─finsuit-assets --------------------所有微项目的公共资源
│  │  ├─icomoon
│  │  │  ├─demo-files
│  │  │  └─fonts
│  │  ├─images
│  │  └─less
│  ├─finsuit-components ----------------所有微项目的公共组件
│  │  ├─Button
│  │  │  └─less
│  │  ├─Confirm
│  │  ├─EllipsisText
│  │  ├─HttpErrorDialog
│  │  ├─Loading
│  │  ├─MaskBox
│  │  ├─Popup
│  │  └─Toast
│  ├─finsuit-h5 ------------------------所有微项目的比财H5开发插件包
│  │  └─libs
│  ├─finsuit-http ----------------------所有微项目的请求封装处理
│  └─finsuit-store ---------------------所有微项目的H5开发插件包辅助store
└─pages
    └─templateA ------------------------微项目A
    │ ├─apis
    │ ├─config
    │ ├─router
    │ ├─store
    │ └─view
    │      └─main
    │          └─modules
    └─templateB ------------------------微项目B
    │ ├─apis
    │ ├─config
    │ ├─router
    │ ├─store
    │ └─view
    │     └─main
    │         └─modules
```
### 打包目录结构
``` bash
├─templateA -------------------------- 微项目A dist包
│  └─static
│      ├─css
│      ├─fonts
│      ├─img
│      └─js
└─templateB -------------------------- 微项目B dist包
    └─static
        ├─css
        ├─fonts
        └─js
```
-------------------

### finsuit-h5插件包集成功能
- this.$Toast()：提示框
- this.$Loading("加载中")：加载loading
- this.$iosAlert()：对话框
- this.$bcBridge对象：原生sdk
- this.$login():去登录
- this.$checkLogin(): 按钮登录拦截器
- this.$checkToLogin():按钮登录拦截器
- this.$utils():工具包
- this.$modalHelper():弹窗模态辅助器
- this.$browser():浏览器和系统信息
- this.$downloadApp():去下载app
- this.$bootstrap():使用插件包挂载app，处理了用户登录

-------------------

### 新项目上手指南

- 第一步：快速复制template项目集成包创建新的微项目，并启用新的名称，该名称也对应服务器部署目录名，也就是assetsPublicPath，例如：joyPage
- 第二步：全局检索：@template 全部替换为 @joyPage（你的项目名称）  设置检索位置：template
- 第三步：将新项目目录中的template.js 和 template.html 重命名 : joyPage
- 第四步：npm run dev  浏览器输入http://0.0.0.0:7789/joyPage.html
- 第五步：npm run build:pord joyPage 打包到dist文件夹中。

### 老项目上手指南
- 第一步：

