# 快速上手

## 安装

### 通过 npm 安装

```bash
$ npm i @xuanmo/dynamic-form
```

### 通过 yarn 或者 pnpm 安装

```bash
$ yarn add @xuanmo/dynamic-form

$ pnpm add @xuanmo/dynamic-form
```

## 引入组件

```typescript
import { createApp } from 'vue'

// 1. 引入组件
import DForm, { validator } from '@xuanmo/dynamic-form'

// 2. 引入校验国际化并注册
import zhCN from '@xuanmo/validator/locale/zh-CN.json'
validator.localize(zhCN)

// 3. 引入组件样式
import '@xuanmo/dynamic-form/dist/index.css'

const app = createApp()

// 4. 注册组件
app.use(DForm)
```
