<template>
  <d-cell-group title="基础用法">
    <d-input v-model="value" label="输入框" placeholder="请输入文字" @blur="onBlur" />
    <d-input v-model="value" placeholder="无标题显示" hide-label />
  </d-cell-group>
  <d-cell-group title="禁用、只读状态">
    <d-input v-model="value" label="输入框禁用" placeholder="请输入文字" readonly />
    <d-input v-model="value" label="输入框禁用" placeholder="请输入文字" disabled />
  </d-cell-group>
  <d-cell-group title="字数限制">
    <d-input v-model="value" label="输入框" placeholder="请输入文字" :maxlength="10" />
  </d-cell-group>
  <d-cell-group title="扩展类型">
    <d-input label="密码" placeholder="请输入密码" type="password" />
    <d-input v-model="number" label="数字输入框" placeholder="请输入密码" type="number" />
    <d-input v-model="value" label="邮箱" placeholder="请输入邮箱" type="email" />
    <d-input v-model="value" label="单价" placeholder="请输入文字" suffix="元" />
    <d-input v-model="value" label="单价" placeholder="请输入文字" suffix="元">
      <template #suffix>slot 形式</template>
    </d-input>
  </d-cell-group>
  <d-cell-group title="其他设置">
    <d-input v-model="value" label="显示冒号" placeholder="请输入文字" colon />
    <d-input v-model="value" label="可被清除" placeholder="请输入文字" clearable />
    <d-input
      v-model="value"
      label="显示图标"
      placeholder="请输入文字"
      :left-icon="TipsOutlined"
      :left-icon-props="{ color: '#f00' }"
    />
    <d-input v-model="value" label="超长文字展示" placeholder="请输入文字" label-align="right" />
  </d-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TipsOutlined } from '@xuanmo/dl-icons'

const value = ref('')
const number = ref('')

function onBlur(value: string) {
  console.log(value)
}
</script>
