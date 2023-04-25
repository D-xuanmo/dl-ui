<template>
  <div :class="className" @click="handleCopy">
    <div :class="scrollClassName">
      <img :src="copyIcon" title="复制代码" />
      <d-icon
        :name="status ? 'success-f' : 'close-f'"
        :color="status ? 'var(--d-success)' : 'var(--d-error)'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@/utils/bem'
import copyIcon from '../../assets/images/copy.svg'
import { computed, ref } from 'vue'

const props = defineProps<{
  code: string
}>()

const [, bem] = createNamespace('doc-preview')
const status = ref<boolean | null>(null)

const className = bem('copy')
const scrollClassName = computed(() =>
  bem('copy-scroll', {
    success: status.value
  })
)

const handleCopy = async () => {
  window.navigator.clipboard
    .writeText(props.code)
    .then(() => {
      status.value = true
    })
    .catch(() => {
      status.value = false
    })
  setTimeout(() => {
    status.value = null
  }, 2000)
}
</script>
