# Icon 图标

```vue preview type=h5
<template>
  <DCellGroup title="基础用法">
    <DCell content-align="left">
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
    <DCell content-align="left">
      <DIcon
        name="close"
        color="#f00"
      />
      <DIcon
        name="close"
        color="#ed7b2f"
      />
      <DIcon
        name="close"
        color="var(--d-primary)"
      />
    </DCell>
  </DCellGroup>
</template>
```

## API

### Icon Props

| 参数  | 类型   | 默认值 | 说明                                                                     | 必传 |
| ----- | ------ | ------ | ------------------------------------------------------------------------ | ---- |
| name  | string | -      | 图标名称                                                                 | Y    |
| size  | string | medium | 图标大小，可选值：small/medium/large/string，为 `string` 时，单位为 `px` | N    |
| color | string | -      | 图标颜色                                                                 | N    |
