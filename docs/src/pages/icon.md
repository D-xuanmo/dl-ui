# Icon 图标

图标基于 `SVG`，通过 `Icon` 组件使用

## 基础用法

通过 `name` 设置对应的图标名

```vue preview type=h5
<template>
  <DIcon name="close" />
  <DIcon name="tips" />
  <DIcon name="tips-o" />
  <DIcon name="success" />
  <DIcon name="warning" />
</template>
```

## 图标颜色、大小修改、旋转

通过 `size` 属性改变大小，`color` 可改变颜色

```vue preview type=h5
<template>
  <DCellGroup title="旋转">
    <DCell content-align="left">
      <DIcon
        name="loading"
        spin
      />
      <DIcon
        name="loading-2"
        spin
      />
      <DIcon
        name="close"
        spin
      />
    </DCell>
  </DCellGroup>
  <DCellGroup title="大小调整">
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
        name="tips"
        size="30px"
      />
    </DCell>
  </DCellGroup>
  <DCellGroup title="颜色修改">
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
