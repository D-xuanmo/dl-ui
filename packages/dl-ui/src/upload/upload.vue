<template>
  <div :class="wrapperClassName">
    <upload-list :list="previewList" :deletable="canDeletable" @delete="handleDeleteItem">
      <template #trigger>
        <div v-if="!readonly" :class="triggerClassName" :style="triggerStyle">
          <input
            type="file"
            :accept="accept"
            :multiple="multiple"
            :disabled="disabled"
            :capture="capture"
            @change="handleChange"
          />
          <slot>
            <camera-filled :class="triggerIconClassName" />
          </slot>
        </div>
      </template>
      <template #preview-item="{ item, handler }">
        <slot name="preview-item" :item="item" :handler="handler" />
      </template>
    </upload-list>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref } from 'vue'
import { UploadListItemType, UPLOAD_PROPS } from './props'
import { createUploadNameSpace } from './utils'
import UploadList from './upload-list.vue'
import { debugWarn, deepCopy, isObject, throwError } from '@xuanmo/utils'
import { addUnit, filePreview, request, useFormEvent } from '@xuanmo/dl-common'
import { CameraFilled } from '@xuanmo/dl-icons'

const [name, bem] = createUploadNameSpace()

export default defineComponent({
  name,
  components: {
    CameraFilled,
    UploadList
  },
  props: UPLOAD_PROPS,
  emits: ['update:model-value', 'change', 'success', 'error', 'exceed-count', 'exceed-size'],
  setup(props, { emit }) {
    const { emit: formEventEmit } = useFormEvent(props.model!)
    const wrapperClassName = bem()
    const triggerClassName = computed(() =>
      bem('trigger', {
        disabled: props.disabled || props.readonly
      })
    )
    const triggerIconClassName = bem('trigger-icon')
    const fileList = ref<File[]>([])
    const localPreviewList = ref<UploadListItemType[]>([])
    const fileListDisposers: Map<number, () => void> = new Map()
    const previewList = computed(() => [...props.modelValue, ...localPreviewList.value])
    const triggerStyle = computed<CSSProperties>(() => ({
      width: addUnit(props.previewSize),
      height: addUnit(props.previewSize)
    }))

    const canDeletable = computed(() => {
      return props.deletable && !props.disabled && !props.readonly
    })

    const handleUpload = async (files: File[]) => {
      if (!props.action) throwError(name, '未配置文件上传请求地址')
      let queueTask = files.length
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const beforeUpload = await props.beforeUpload?.(file, {
          index: i,
          files
        })
        if (beforeUpload === false) return
        const formData = new FormData()
        const currentPreview = localPreviewList.value[i]
        formData.append(props.name, file, file.name)
        if (isObject(props.data)) {
          for (const [key, value] of Object.entries(props.data)) {
            formData.append(key, value)
          }
        }
        localPreviewList.value.splice(i, 1, {
          ...currentPreview,
          loading: true
        })
        request({
          url: props.action!,
          method: 'POST',
          headers: props.headerParams as any,
          data: formData
        })
          .then((response: any) => {
            const formatted = props.uploadAfter?.(response as XMLHttpRequestResponseType)
            if (!isObject(formatted) && props.uploadAfter) {
              throwError(name, 'uploadAfter 返回格式不正确')
            }
            const preview: UploadListItemType = {
              url: response?.data.url,
              deletable: response?.data.deletable ?? true,
              ...formatted
            }
            fileListDisposers.get(i)?.()
            fileListDisposers.delete(i)
            localPreviewList.value.splice(i, 1, {
              ...preview,
              loading: false
            })
            emit('success', response)
            formEventEmit?.('success', response, props.rowId)
          })
          .catch((error) => {
            localPreviewList.value.splice(i, 1, {
              ...currentPreview,
              loading: false,
              fail: true
            })
            emit('error', error)
            formEventEmit?.('error', error, props.rowId)
          })
          .finally(async () => {
            queueTask--
            if (queueTask === 0) {
              fileList.value = []
              emit('update:model-value', [...props.modelValue, ...localPreviewList.value])
              localPreviewList.value = []
              fileList.value = []
            }
          })
      }
    }

    const handleChange = (event: Event) => {
      const { files } = event.target as HTMLInputElement

      if (!files) return

      if (files.length + previewList.value.length > props.maxCount) {
        emit('exceed-count')
        formEventEmit?.('exceed-count', undefined, props.rowId)
        return debugWarn(name, `已选文件个数不能大于${props.maxCount}个`)
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.size > props.maxSize) {
          emit('exceed-size')
          formEventEmit?.('exceed-size', file, props.rowId)
          return debugWarn(name, `${file.name}文件大小不能大于${props.maxSize}B`)
        }

        const [url, disposer] = filePreview(file)

        fileList.value.push(file)
        localPreviewList.value.push({
          url,
          deletable: true
        })
        fileListDisposers.set(i, disposer)
      }

      emit('change', files)
      formEventEmit?.('change', files, props.rowId)
      handleUpload(fileList.value)
    }

    const handleDeleteItem = (index: number) => {
      const newValue = deepCopy(props.modelValue)
      newValue.splice(index, 1)
      emit('update:model-value', newValue)
    }

    return {
      wrapperClassName,
      triggerClassName,
      triggerIconClassName,
      localPreviewList,
      previewList,
      triggerStyle,
      canDeletable,
      handleChange,
      handleDeleteItem
    }
  }
})
</script>
