# Cell 单元格

用于展示 2 列信息，左侧为标题，右侧为内容的场景

## CellGroup 单元格分组

```vue
<template>
  <DCellGroup title="CellGroup 分组">
    <DCell
      title="我是标题"
      content="内容"
    />
    <DCell
      title="我是标题"
      content="内容"
    />
  </DCellGroup>
  <DCellGroup
    title="展示圆角"
    round
  >
    <DCell
      title="我是标题"
      content="内容"
    />
    <DCell
      title="我是标题"
      content="内容"
    />
  </DCellGroup>
</template>
```

## Cell 单元格

```vue
<template>
  <DCell
    title="我是标题"
    content="内容"
  />
  <DCell
    title="我是标题"
    content="必填标识"
    required
  />
  <DCell
    content="隐藏标题"
    hide-title
  />
  <DCell
    title="扩展内容"
    content="正文"
    suffix="单位"
  />
  <DCell
    title="扩展内容"
    content="正文"
  >
    <template #suffix>单位</template>
  </DCell>
  <DCell
    title="显示图标"
    left-icon="tips"
    right-icon="close"
  />
  <DCell
    title="显示图标"
    content="图标大小、颜色控制"
    left-icon="tips"
    left-icon-size="small"
    left-icon-color="#f00"
    right-icon="close"
    right-icon-color="#f00"
  />
</template>
```

## API

### CellGroup Props

| 参数   | 类型    | 默认值 | 说明         | 必传 |
| ------ | ------- | ------ | ------------ | ---- |
| title  | string  | -      | 分组标题     | N    |
| radius | boolean | false  | 是否展示圆角 | N    |

### Cell Props

| 参数             | 类型                | 默认值 | 说明                                    | 必传 |
| ---------------- | ------------------- | ------ | --------------------------------------- | ---- |
| title            | string              | -      | 标题                                    | N    |
| title-class      | string              | -      | 标题类名                                | N    |
| title-align      | string              | left   | 标题对齐方式，可选值：left/center/right | N    |
| hide-title       | boolean             | false  | 是否隐藏标题                            | N    |
| required         | boolean             | false  | 是否显示必填标识                        | N    |
| content          | string              | -      | 内容                                    | N    |
| content-class    | string              | -      | 内容类名                                | N    |
| content-align    | string              | right  | 内容对齐方式，可选值：left/center/right | N    |
| disabled         | boolean             | -      | 是否禁用                                | N    |
| suffix           | string              | -      | 扩展内容                                | N    |
| left-icon        | string              | -      | 显示左侧图标                            | N    |
| left-icon-size   | string              | -      | 左侧图标大小，继承 `Icon` 组件 `Props`  | N    |
| left-icon-color  | string              | -      | 左侧图标颜色                            | N    |
| left-icon-props  | Record<string, any> | -      | 左侧 `Icon` 图标组件 props              | N    |
| right-icon       | string              | -      | 显示右侧图标                            | N    |
| right-icon-size  | string              | -      | 右侧图标大小，继承 `Icon` 组件 `Props`  | N    |
| right-icon-color | string              | -      | 右侧图标颜色                            | N    |
| right-icon-props | Record<string, any> | -      | 右侧 `Icon` 图标组件 props              | N    |

### Cell Slots

| 名称    | 说明           |
| ------- | -------------- |
| title   | 自定义标题     |
| content | 自定义内容     |
| suffix  | 自定义扩展内容 |
