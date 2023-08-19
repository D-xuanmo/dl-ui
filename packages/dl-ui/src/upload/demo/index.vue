<template>
  <d-upload
    v-model="value"
    action="/api/my-admin/p/file/upload"
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
import { UploadListItemType } from '../props'

const value = ref<UploadListItemType[]>([
  { url: '/api/file-server/read-file/cf5be5e5-a84b-41e9-b91a-c99646039f15', deletable: false }
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

onMounted(() => {
  document.querySelector('.d-preview-mobile__content')?.classList.add('bg-white')
})

onUnmounted(() => {
  document.querySelector('.d-preview-mobile__content')?.classList.remove('bg-white')
})
</script>
