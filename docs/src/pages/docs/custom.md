# 自定义能力

## 定制主题

通过覆盖 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 可以实现主题定制，组件级可参考组件文档

变量源文件 [https://github.com/D-xuanmo/dl-ui/blob/develop/packages/src/style/var.scss](https://github.com/D-xuanmo/dl-ui/blob/develop/packages/src/style/var.scss)

```scss
:root {
  // 主题色
  --d-primary: #1b62eb;

  // 提示类颜色
  --d-success: #00a870;
  --d-warning: #ed7b2f;
  --d-error: #e34d59;

  --d-white-color: #fff;

  // 灰色
  --d-gray-1: #f3f3f3;
  --d-gray-2: #eeeeee;
  --d-gray-3: #e8e8e8;
  --d-gray-4: #dddddd;
  --d-gray-5: #c6c6c6;
  --d-gray-6: #a6a6a6;
  --d-gray-7: #8b8b8b;
  --d-gray-8: #777777;
  --d-gray-9: #5e5e5e;
  --d-gray-10: #4b4b4b;
  --d-gray-11: #393939;
  --d-gray-12: #2c2c2c;
  --d-gray-13: #242424;
  --d-gray-14: #181818;

  // 边框颜色
  --d-border-color: #e5e5e5;
  --d-border: 1px solid var(--d-border-color);

  // 阴影
  --d-box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  // 圆角
  --d-radius-xs: 2px;
  --d-radius-md: 4px;
  --d-radius-lg: 8px;

  // 文字大小
  --d-font-size-xs: 10px;
  --d-font-size-sm: 12px;
  --d-font-size-md: 14px;
  --d-font-size-lg: 16px;

  // 行高
  --d-line-height-xs: calc(var(--d-font-size-xs) + 8px);
  --d-line-height-sm: calc(var(--d-font-size-sm) + 8px);
  --d-line-height-md: calc(var(--d-font-size-md) + 8px);
  --d-line-height-lg: calc(var(--d-font-size-lg) + 8px);

  // 文字颜色
  --d-title-color: #{rgba(black, 0.85)};
  --d-primary-text-color: #{rgba(black, 0.85)};
  --d-secondary-text-color: #{rgba(black, 0.45)};
  --d-disable-color: #{rgba(black, 0.25)};
  --d-placeholder-color: #{rgba(black, 0.25)};

  // 间距
  --d-gap-xxs: 4px;
  --d-gap-xs: 8px;
  --d-gap-sm: 16px;
  --d-gap-md: 24px;
  --d-gap-lg: 32px;

  // 水平间距
  --d-horizontal-gap: calc(var(--d-gap-xxs) + var(--d-gap-xs));
}
```

## 表单校验规则扩展

> 更多用法参考 [https://github.com/D-xuanmo/validator](https://github.com/D-xuanmo/validator)

```typescript
import { validator } from '@xuanmo/dl-ui'
validator.extends({
  custom: {
    message: '自定义校验失败信息',
    validator: (value: string) => value !== ''
  }
})
```
