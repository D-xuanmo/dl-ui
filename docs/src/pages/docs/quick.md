# 快速上手

## 全量功能安装

- `dl-common` 包含 PC、H5 通用的组件，一些公用方法，独立于 UI 包之外
- `dl-ui` 包含所有组件的功能
- `validator` 非必须包，如果不需要表单校验可不用安装
- `dl-icons` 非必须包，如果需要扩展图标，可自行安装

```bash
# npm 安装
$ npm i @xuanmo/{dl-ui,dl-common,dl-icons}

# yarn 安装
$ yarn add @xuanmo/{dl-ui,dl-common,dl-icons}

# pnpm 安装
$ pnpm add @xuanmo/{dl-ui,dl-common,dl-icons}
```

## 完整引入组件

```typescript
import { createApp } from 'vue'

// 1. 引入组件
import DLUI from '@xuanmo/dl-ui'

// 2. 引入组件样式
import '@xuanmo/dl-ui/dist/index.css'

const app = createApp()

// 3. 注册组件
app.use(DLUI)
```

## 按需引入

```typescript
import { createApp } from 'vue'

// 1. 引入组件
import { DButton } from '@xuanmo/dl-ui'

// 2. 引入组件样式
import '@xuanmo/dl-ui/dist/index.css'

const app = createApp()

// 3. 注册组件
app.use(DButton)
```

## common 公用包

- `@xuanmo/dl-ui` 默认包含以下组件；
- PC、H5 通用的组件，可独立使用，不依赖 UI 包，引入如下：

```typescript
// 全量引入
import DLCommon from '@xuanmo/dl-common'

// 按需引入组件
// import {
//   DGrid,
//   DGridItem,
//   DMessage,
//   DButton,
//   DPopup,
//   DOverlay,
//   DSpace,
//   DImage,
//   // ... 更多参考公用组件篇
// } from '@xuanmo/dl-common'

// 引入样式
import '@xuanmo/dl-common/dist/index.css'

const app = createApp()

// 全量注册
app.use(DLCommon)
```
