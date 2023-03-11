# Image 图片

基于 `img` 标签封装，增加 `loading`、`加载失败` 效果

```vue playground=blbuqb height=600

```

## API

### Props

| 参数         | 类型                               | 默认值 | 说明                                                                                    | 必传 |
| ------------ | ---------------------------------- | ------ | --------------------------------------------------------------------------------------- | ---- |
| src          | `string`                           | -      | 图片地址                                                                                | Y    |
| width        | `string \| number`                 | -      | 图片宽度，类型为数字时，单位：px                                                        | N    |
| height       | `string \| number`                 | -      | 图片高度，类型为数字时，单位：px                                                        | N    |
| alt          | `string`                           | -      | img 原生属性                                                                            | N    |
| fit          | `CSSProperties['object-fit']`      | `fill` | CSS [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)           | N    |
| position     | `CSSProperties['object-position']` | -      | CSS [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) | N    |
| radius       | `string \| number`                 | -      | 圆角大小，类型为数字时，单位：px                                                        | N    |
| round        | `boolean`                          | -      | 是否为圆形，此参数优先级高于 `radius`                                                   | N    |
| show-loading | `boolean`                          | -      | 是否显示 loading                                                                        | N    |
| loading-icon | `string`                           | -      | loading 图标，与 `Icon` 组件 `name` 属性一致                                            | N    |
| error-icon   | `string`                           | -      | 加载失败图标，与 `Icon` 组件 `name` 属性一致                                            | N    |
| error-text   | `string`                           | -      | 加载失败提示文案                                                                        | N    |
