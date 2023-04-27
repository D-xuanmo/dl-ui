# 常见问题

## 表单组件执行校验报错 cannot read properties of undefined (reading 'message')

未注册校验国际化，校验默认不引入国际化文件，需要单独引入，报错如下

![](https://upyun.xuanmo.xin/dl-ui/20230427230034980653.png)

```typescript
// 1. 引入组件
import DForm, { validator } from '@xuanmo/dl-ui'

// 2. 引入校验国际化并注册
import zhCN from '@xuanmo/validator/locale/zh-CN.json'
validator.localize(zhCN)
```

## 使用 pnpm 安装依赖，引入国际化时，找不到包

使用 `pnpm` 安装依赖，不会自动安装 `@xuanmo/validator` 包，需要手动安装一次 `@xuanmo/validator` 即可解决，目前未排查到原因，知晓的朋友可以帮忙解答一下 😁

![](https://upyun.xuanmo.xin/dl-ui/20230427230034522504.png)
