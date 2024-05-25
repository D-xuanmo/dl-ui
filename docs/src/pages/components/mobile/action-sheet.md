# ActionSheet

一种从底部弹出的模态框，提供和当前场景相关的操作。

## 引入

```typescript
import { createApp } from 'vue';
import { DActionSheet, useActionSheet } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DActionSheet)
```

## 代码演示

```vue previewType=iframe client=Mobile
<template>
  <d-space direction="vertical" :gap="10">
    <d-button block @click="visible = true">显示</d-button>
    <d-button block @click="showActionSheet">函数调用</d-button>
  </d-space>
  <d-action-sheet v-model:visible="visible" :options="options" description="我是描述内容" />
</template>

<script setup lang="ts">
  import { ref, h } from 'vue'
  import { ActionSheetOptions, useActionSheet} from '@xuanmo/dl-ui'
  import { ShareOutlined } from '@xuanmo/dl-icons'
  import { useMessage } from '@xuanmo/dl-common'

  const actionSheet = useActionSheet()
  const message = useMessage()

  const visible = ref(false)

  const options: ActionSheetOptions = [
    { value: 'default', label: '默认主题', icon: h(ShareOutlined, { size: 'small' }) },
    { value: 'primary', status: 'primary', label: '主题' },
    { value: 'success', status: 'success', label: '成功主题' },
    { value: 'warning', status: 'warning', label: '警告主题' },
    { value: 'danger', status: 'danger', label: '错误主题' },
    { value: 'danger', disabled: true, label: '错误主题' }
  ]

  const showActionSheet = () => {
    actionSheet({
      options,
      showCancel: false,
      onSelected(item) {
        message.success(item.label)
      }
    })
  }
</script>
```

## API

### Dialog Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|v-mode:visible|`boolean`|-|面板显示隐藏|Y|
|options|`ActionSheetOptions`|-|面板选项数据|Y|
|description|`string`|-|面板描述|N|
|align|`'left' \| 'center'`|`center`|文字对齐方式|N|
|show-cancel|`boolean`|`true`|显示关闭按钮|N|
|cancel-button-text|`string`|`取消`|关闭按钮文字|N|
|onSelected|`(item: IActionSheetOption, index: number) => void`|-|面板选择完成事件|N|
|onClose|`() => void`|-|关闭事件|N|

### Events

|事件|说明|回调参数|
|---|----|-------|
|update:visible|显示隐藏事件|`(value: boolean) => void`|
|selected|确认事件|`(item: IActionSheetOption, index: number) => void`|
|close|关闭事件|`() => void`|

### TS 类型

```typescript
import { 
  ActionSheetProps,
  ActionSheetOptions, 
  IActionSheetOption
} from '@xuanmo/dl-ui'
```

#### IActionSheetOption

```typescript
export interface IActionSheetOption extends IData {
  /**
   * 图标
   */
  icon?: VNode

  /**
   * 数据状态
   */
  status?: ButtonProps['theme']
}
```
