<template>
  <input
    class="custom-input"
    :value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    @input="handleChange"
  />
</template>

<script lang="ts" setup>
defineProps<{
  modelValue?: string
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
}>()
const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss">
.custom-input {
  width: 100%;
  border: 1px solid var(--d-border-color);
}
</style>
