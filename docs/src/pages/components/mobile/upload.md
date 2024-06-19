# Upload 文件上传

用于图片、文件的上传。

## 引入

```typescript
import { createApp } from 'vue';
import { DUpload } from '@xuanmo/dl-ui'

// 注册组件
const app = createApp()
app.use(DUpload)
```

## 代码演示

```vue client=Mobile playground=MUpload previewType=iframe
<template>
  <d-upload
    v-model="value"
    action="/papi/my-admin/file/upload"
    multiple
    upload-data-key="files"
    :data="uploadData"
    :header-params="headerParams"
    :upload-after="uploadAfterHandler"
  />
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import { dCookie } from '@xuanmo/utils'

  const value = ref([
    {
      url: 'https://admin.xuanmo.xin/papi/my-admin/file/read/02e535e6-8348-423e-8cf5-0d480fa4d247',
      deletable: false
    }
  ])

  const uploadData = {
    type: 'media',
    directoryId: '1de547bf-67d4-4a7d-bb88-2178090327c8'
  }

  const headerParams = {
    'X-XSRF-TOKEN': dCookie().getItem('csrfToken')
  }

  const uploadAfterHandler = (response: any) => {
    return {
      url: response.data?.[0].url,
      deletable: true
    }
  }
</script>

<style>
.dl-doc-preview__mobile-runtime-inner {
  background-color: #fff !important; 
}
</style>
```

## API

### Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|model-value/v-model|`UploadListItemType[]`|-|当前文件列表|Y|
|action|`string`|-|文件上传地址|N|
|accept|`string`|`image/*`|文件上传类型，input 原生属性|N|
|capture|`'user' \| 'environment' \| boolean \| undefined`|-|相机调取模式，原生属性|N|
|method|`string`|`POST`|请求方式|N|
|name|`string`|`file`|文件上传字段名|N|
|multiple|`boolean`|`false`|是否多选|N|
|disabled|`boolean`|`false`|禁用|N|
|readonly|`boolean`|`false`|只读|N|
|deletable|`boolean`|`true`|是否展示删除按钮|N|
|max-size|`number`|`Infinity`|上传大小限制，单位：byte|N|
|max-count|`number`|`Infinity`|上传个数|N|
|preview-size|`number`|`80px`|上传区域预览大小|N|
|data|`Record<string, any>`|-|文件上传需要携带的附加参数|N|
|header-params|`Record<string, any>`|-|文件上传请求头参数|N|
|before-upload|`BeforeUploadType`|-|文件上传前回调函数，返回false终止上传|N|
|upload-after|`AfterUploadType`|-|文件上传成功回调，返回文件预览列表|N|

### Slots

|名称|说明|参数|
|---|----|---|
|default|自定义文件上传触发内容|-|
|preview-item|自定义渲染单个预览|`{ item: UploadListItemType, handler: () => originalFN }`|

### Events

|事件|说明|回调参数|
|---|----|-------|
|update:model-value|文件 value 变更|`value: UploadListItemType[]`|
|change|文件选择，原生事件|`value: FileList`|
|exceed-size|文件大小超出限制|-|
|exceed-count|文件个数超出限制|-|
|success|文件上传成功回调|`value: Response`|
|error|文件上传失败回调|`value: Response`|

### TypeScript 类型

```typescript
/**
 * 文件上传列表单条数据类型
 */
export type UploadListItemType = {
  /**
   * 文件地址
   */
  url: string

  /**
   * 是否允许删除
   */
  deletable: boolean

  /**
   * 上传状态
   */
  loading?: boolean

  /**
   * 上传失败
   */
  fail?: boolean
}

/**
 * 上传回调公用类型
 */
export type UploadCallbackParameters = (
  file: File,
  detail: {
    index: number
    files: File[]
  }
) => void

/**
 * 上传前拦截方法
 */
export type BeforeUploadType = (...rest: Parameters<UploadCallbackParameters>) => Promise<boolean>

/**
 * 上传后拦截方法
 */
export type AfterUploadType = (response: XMLHttpRequestResponseType) => UploadListItemType
```
