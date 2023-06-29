# 快速上手

## 全量功能安装

`validator` 不是必须的，如果不需要表单校验可不用安装

```bash
# npm 安装
$ npm i @xuanmo/{dl-ui,dl-common,validator}

# yarn 安装
$ yarn add @xuanmo/{dl-ui,dl-common,validator}

# pnpm 安装
$ pnpm add @xuanmo/{dl-ui,dl-common,validator}
```

## 完整引入组件

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

一些 PC、H5 通用的组件，做了独立包拆分使用，不依赖 UI 包，引入如下：

```typescript
// 按需引入组件
import {
  DGrid,
  DGridItem,
  DMessage,
  DButton,
  DPopup,
  DOverlay,
  DSpace,
  DImage
} from '@xuanmo/dl-common'

// 引入样式
import '@xuanmo/dl-common/dist/index.css'

const app = createApp()

// 3. 注册组件
app.use(DButton)
```
