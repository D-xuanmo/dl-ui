# DL UI

一个基于 Vue 3 的低代码组件库

## DL 释义

- D 代表梦想（Dream）、动态（Dynamic）
- L 代表低代码（Low code）

## 亮点

- 🚀 表单作为容器、也作为低代码运行时解析器，可以容纳任意组件，通过 `JSON` 格式配置即可完成表单搭建，具体细节见[表单篇](https://www.xuanmo.xin/-/dl-ui/comp-common/form)
- 💪 提供明细表数据层封装，使用者只需要负责实现 UI 效果即可，完美融合到表单使用，自带校验
- 💪 内置常用表单组件，支持扩展组件
- 💪 繁琐的表单校验通过规则配置即可，校验与表单业务可完美剥离
- 💪 可扩展的图标库
- ✍️ 使用 TypeScript 开发，提供完整的类型定义
- 🛠 更多功能开发中，欢迎共建...

## 组件划分

目前 UI 组件分为公用组件、移动端组件：

- 公用组件代表 PC、H5 可以通用，公用组件也属于底层组件，可以通过多个组件进行组合，衍生出一个新的组件，比如一个 `Picker 选择器`，就是通过 `遮罩层（Overlay）+ 弹出层（Popup）`实现的，通过组件细分化可以组合出更多的场景
- 移动端代表仅 H5 适用

## 组件开发初衷

- 自己比较懒，不太喜欢做重复的事情，能用轮子解决的事情，尽量不搞第二次，由之前 [Vue 2](https://github.com/D-xuanmo/v-form) 版的配置表单开始，自己对这种通过 JSON 配置就能完成一个表单的渲染，深受喜爱，因为工作的缘故，目前主要做低代码平台产品（表单生态），也是一个比较感兴趣的方向；
- 做开源也是为了能够认识更多朋友，从中学习一些工作中可能遇见不到的场景，欢迎一起讨论交流。

## 特别鸣谢

- 感谢 [JetBrains](https://www.jetbrains.com/) 提供的 [非商业开源软件开发授权](https://www.jetbrains.com/shop/eform/opensource)
- 感谢 [JasKang](https://github.com/JasKang/vite-plugin-markdown-preview) 提供的 Markdown 预览方案
- 感谢 [三咲智子](https://github.com/element-plus/element-plus-playground) 提供的在线运行组件方案

## License

- 本项目基于 [MIT](https://github.com/D-xuanmo/dl-ui/blob/develop/LICENSE) 协议，欢迎有兴趣的朋友一起交流
- Copyright © 2022-PRESENT [D-xuanmo](https://github.com/D-xuanmo)

## 动态

![Alt](https://repobeats.axiom.co/api/embed/f270a03be41013fefb30c5353188547b34b92941.svg "Repobeats analytics image")

<style>
.d-doc__inner-content li {
  list-style-type: circle;
}
</style>
