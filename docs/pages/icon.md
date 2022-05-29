---
title: 'Icon'
---

# Icon 图标

```vue demo h5
<template>
  <DCellGroup title="基础用法">
    <DCell align="left">
      <DIcon
        name="close"
        size="small"
      />
      <DIcon
        name="close"
        size="medium"
      />
      <DIcon
        name="close"
        size="large"
      />
      <DIcon
        name="arrow-right"
        size="large"
      />
    </DCell>
  </DCellGroup>
  <DCellGroup title="图标颜色">
    <DCell align="left">
      <DIcon
        name="close"
        color="#f00"
      />
      <DIcon
        name="close"
        color="#ed7b2f"
      />
    </DCell>
  </DCellGroup>
</template>
```

## API

### Icon Props

| 参数  | 类型                       | 默认值 | 说明     | 必传 |
| ----- | -------------------------- | ------ | -------- | ---- |
| name  | string                     | -      | 图标名称 | Y    |
| size  | TS 类型 small/medium/large | medium | 图标大小 | N    |
| color | string                     | -      | 图标颜色 | N    |
