# 自定义能力

## 定制主题

通过覆盖 [CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties) 可以实现主题定制，组件级可参考组件文档

变量源文件 [https://github.com/D-xuanmo/dl-ui/blob/develop/packages/dl-common/src/style/var.scss](https://github.com/D-xuanmo/dl-ui/blob/develop/packages/dl-common/src/style/var.scss)

```css
:root {
  // 主题色
  --d-primary: #1890ff;
  --d-primary-5: #40a9ff;
  --d-primary-4: #69c0ff;
  --d-primary-3: #91d5ff;
  --d-primary-2: #bae7ff;
  --d-primary-1: #e6f7ff;

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
  --d-shadow-1: 0 1px 10px rgba(0, 0, 0, 5%), 0 4px 5px rgba(0, 0, 0, 8%),
  0 2px 4px -1px rgba(0, 0, 0, 12%);
  --d-shadow-2: 0 3px 14px 2px rgba(0, 0, 0, 5%), 0 8px 10px 1px rgba(0, 0, 0, 6%),
  0 5px 5px -3px rgba(0, 0, 0, 10%);
  --d-shadow-3: 0 6px 30px 5px rgba(0, 0, 0, 5%), 0 16px 24px 2px rgba(0, 0, 0, 4%),
  0 8px 10px -5px rgba(0, 0, 0, 8%);

  // 圆角
  --d-radius-small: 3px;
  --d-radius-medium: 6px;
  --d-radius-large: 9px;
  --d-radius-extraLarge: 12px;

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

更多用法参考 [https://github.com/D-xuanmo/validator](https://github.com/D-xuanmo/validator)

```typescript
import { validator } from '@xuanmo/dl-ui'

// 或者
// import { validator } from '@xuanmo/dl-common'

validator.extends({
  custom: {
    message: '自定义校验失败信息',
    validator: (value: string) => value !== ''
  }
})
```
