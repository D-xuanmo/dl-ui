<template>
  <div :class="className" @click="handleCopy">
    <div :class="scrollClassName">
      <img :src="copyIcon" title="复制代码" />
      <component :is="statusIcon" :color="statusColor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import copyIcon from '../../assets/images/copy.svg'
import { computed, markRaw, ref } from 'vue'
import { createNamespace } from '@doc/utils'
import { CloseFilled, CheckCircleFilled } from '@xuanmo/dl-icons'

const props = defineProps<{
  code: string
}>()

const [, bem] = createNamespace('doc-preview')
const status = ref<boolean | null>(null)
const statusIcon = ref(markRaw(CheckCircleFilled))
const statusColor = ref('var(--d-success)')

const className = bem('copy')
const scrollClassName = computed(() =>
  bem('copy-scroll', {
    success: status.value
  })
)

const handleCopy = () => {
  const el = document.createElement('div')
  el.innerHTML = decodeURIComponent(props.code)
  window.navigator.clipboard
    .writeText(el.innerText)
    .then(() => {
      status.value = true
      statusIcon.value = CheckCircleFilled
      statusColor.value = 'var(--d-success)'
    })
    .catch(() => {
      status.value = false
      statusIcon.value = CloseFilled
      statusColor.value = 'var(--d-error)'
    })
  setTimeout(() => {
    status.value = null
  }, 2000)
}
</script>
