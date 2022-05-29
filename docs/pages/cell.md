---
title: 'Cell'
---

# CellGroup 分组

```vue demo h5
<template>
  <DCellGroup title="分组标题">
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
    radius
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

# Cell 单元格

```vue demo h5
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
    hideTitle
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

| 参数         | 类型    | 默认值 | 说明             | 必传 |
| ------------ | ------- | ------ | ---------------- | ---- |
| title        | string  | -      | 标题             | N    |
| content      | string  | -      | 内容             | N    |
| required     | boolean | false  | 是否显示必填标识 | N    |
| hideTitle    | boolean | false  | 是否隐藏标题     | N    |
| titleClass   | string  | -      | 标题类名         | N    |
| contentClass | string  | -      | 内容类名         | N    |
| disabled     | boolean | -      | 是否禁用         | N    |
