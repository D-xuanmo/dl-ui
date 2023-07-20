<p align="center">
  <img src="https://upyun.xuanmo.xin/logo/dl-ui.svg" width="50px" />
</p>

<h1 align="center">DL UI</h1>

<p align="center">一个基于 Vue 3 的低代码组件库</p>

## 全量功能安装

- `validator` 非必须包，如果不需要表单校验可不用安装
- `dl-icons` 非必须包，如果需要扩展图标，可自行安装

```bash
# npm 安装
$ npm i @xuanmo/{dl-ui,dl-common,dl-icons,validator}

# yarn 安装
$ yarn add @xuanmo/{dl-ui,dl-common,dl-icons,validator}

# pnpm 安装
$ pnpm add @xuanmo/{dl-ui,dl-common,dl-icons,validator}
```

## 引入组件

```typescript
import { createApp } from 'vue'

// 1. 引入组件
import DLUI from '@xuanmo/dl-ui'

// 3. 引入组件样式
import '@xuanmo/dl-ui/dist/index.css'

const app = createApp()

// 3. 注册组件
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

## 特别鸣谢

- 感谢 [JetBrains](https://www.jetbrains.com/) 提供的 [非商业开源软件开发授权](https://www.jetbrains.com/shop/eform/opensource)
- 感谢 [JasKang](https://github.com/JasKang/vite-plugin-markdown-preview) 提供的 Markdown 预览方案
- 感谢 [三咲智子](https://github.com/element-plus/element-plus-playground) 提供的在线运行组件方案

## License

- 本项目基于 [MIT](https://github.com/D-xuanmo/dl-ui/blob/develop/LICENSE) 协议，欢迎有兴趣的朋友一起交流
- Copyright © 2022-PRESENT [D-Xuanmo](https://github.com/D-xuanmo)

## 动态

![Alt](https://repobeats.axiom.co/api/embed/f270a03be41013fefb30c5353188547b34b92941.svg "Repobeats analytics image")
