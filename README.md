<p align="center">
  <img src="https://upyun.xuanmo.xin/logo/dl-ui.svg" width="50px" />
</p>

<h1 align="center">DL UI</h1>

<p align="center">一个基于 Vue 3 的低代码组件库</p>

## 安装

### 通过 npm 安装

```bash
$ npm i @xuanmo/dl-ui
```

### 通过 yarn 或者 pnpm 安装

```bash
$ yarn add @xuanmo/dl-ui

$ pnpm add @xuanmo/dl-ui
```

## 引入组件

```typescript
import { createApp } from 'vue'

// 1. 引入组件
import DLUI, { validator } from '@xuanmo/dl-ui'

// 2. 引入校验国际化并注册
import zhCN from '@xuanmo/validator/locale/zh-CN.json'
validator.localize(zhCN)

// 3. 引入组件样式
import '@xuanmo/dl-ui/dist/index.css'

const app = createApp()

// 4. 注册组件
app.use(DLUI)
```

## 亮点

- 🚀 以最少的代码，实现表单渲染
- 🚀 零外部依赖，不依赖其他三方包
- 💪 内置常用表单组件，支持扩展集成到表单使用
- 💪 繁琐的表单校验通过规则配置即可，校验与表单业务可完美剥离
- ✍️ 使用 TypeScript 开发，提供完整的类型定义
- 🛠 更多功能开发中，欢迎共建...

## 链接

- 文档地址：[https://www.xuanmo.xin/-/dl-ui](https://www.xuanmo.xin/-/dl-ui)
- Demo：[https://www.xuanmo.xin/-/dl-ui/demo/form](https://www.xuanmo.xin/-/dl-ui/demo/form)

## 特别鸣谢

- 感谢 [JetBrains](https://www.jetbrains.com/) 提供的 [非商业开源软件开发授权](https://www.jetbrains.com/shop/eform/opensource)
- 感谢 [JasKang](https://github.com/JasKang/vite-plugin-markdown-preview) 提供的 Markdown 预览方案
- 感谢 [三咲智子](https://github.com/element-plus/element-plus-playground) 提供的在线运行组件方案

## License

- 本项目基于 [MIT](https://github.com/D-xuanmo/dl-ui/blob/develop/LICENSE) 协议，欢迎有兴趣的朋友一起交流
- Copyright © 2022-PRESENT [D-Xuanmo](https://github.com/D-xuanmo)

## 动态

![Alt](https://repobeats.axiom.co/api/embed/6748b43f3a850bbfb9fa62bca5a734b06a9a2cf0.svg 'Repobeats analytics image')
