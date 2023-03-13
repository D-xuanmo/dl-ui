<template>
  <div :class="wrapperClassName">
    <upload-list :list="previewList" :deletable="deletable && !disabled" @delete="handleDeleteItem">
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
          <d-icon name="camera-f" :class="triggerIconClasName" />
        </div>
      </template>
    </upload-list>
  </div>
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, ref } from 'vue'
import { UploadListItemType, uploadProps } from './props'
import { createUploadNameSpace } from './utils'
import Icon from '../icon'
import UploadList from './upload-list.vue'
import { debugWarn, deepCopy, isObject, throwError } from '@xuanmo/javascript-utils'
import { addUnit, filePreview } from '../utils'
import request from '../utils/request'

const [name, bem] = createUploadNameSpace()

export default defineComponent({
  name,
  components: {
    [Icon.name]: Icon,
    UploadList
  },
  props: uploadProps,
  emits: ['update:model-value', 'change'],
  setup(props, { emit }) {
    const wrapperClassName = bem()
    const triggerClassName = computed(() =>
      bem('trigger', {
        disabled: props.disabled
      })
    )
    const triggerIconClasName = bem('trigger', ['icon'], true)
    const fileList = ref<File[]>([])
    const localPreviewList = ref<UploadListItemType[]>([])
    const fileListDisposers: Map<number, () => void> = new Map()
    const previewList = computed(() => [...props.modelValue, ...localPreviewList.value])
    const triggerStyle = computed<CSSProperties>(() => ({
      width: addUnit(props.previewSize),
      height: addUnit(props.previewSize)
    }))

    const handleUpload = (files: File[]) => {
      if (!props.action) throwError(name, '未配置文件上传请求地址')
      let queueTask = files.length
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
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
          url: props.action,
          method: 'POST',
          headers: props.headerParams,
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
          })
          .catch(() => {
            localPreviewList.value.splice(i, 1, {
              ...currentPreview,
              loading: false,
              fail: true
            })
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

      if (files.length > props.maxCount) {
        return debugWarn(name, `已选文件个数不能大于${props.maxCount}个`)
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.size > props.maxSize) {
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
      triggerIconClasName,
      localPreviewList,
      previewList,
      triggerStyle,
      handleChange,
      handleDeleteItem
    }
  }
})
</script>
