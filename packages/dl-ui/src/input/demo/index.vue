<template>
  <d-cell-group title="基础用法">
    <d-cell title="输入框">
      <d-input v-model="value" placeholder="请输入文字" @blur="onBlur" />
    </d-cell>
    <d-cell>
      <d-input v-model="value" placeholder="无标题显示" hide-label />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="禁用、只读状态">
    <d-cell title="输入框禁用">
      <d-input v-model="value" placeholder="请输入文字" readonly />
    </d-cell>
    <d-cell title="输入框禁用">
      <d-input v-model="value" placeholder="请输入文字" disabled />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="字数限制">
    <d-cell title="输入框">
      <d-input v-model="value" placeholder="请输入文字" :maxlength="10" />
    </d-cell>
  </d-cell-group>
  <d-cell-group title="扩展类型">
    <d-cell title="密码">
      <d-input placeholder="请输入密码" type="password" />
    </d-cell>
    <d-cell title="数字输入框">
      <d-input v-model="number" placeholder="请输入密码" type="number" />
    </d-cell>
    <d-cell title="邮箱">
      <d-input v-model="value" placeholder="请输入邮箱" type="email" />
    </d-cell>
    <d-cell title="单价" suffix="元">
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
    <d-cell title="单价" suffix="元">
      <d-input v-model="value" placeholder="请输入文字">
        <template #suffix>slot 形式</template>
      </d-input>
    </d-cell>
  </d-cell-group>
  <d-cell-group title="其他设置">
    <d-cell title="显示冒号" colon>
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
    <d-cell title="可被清除">
      <d-input v-model="value" placeholder="请输入文字" clearable />
    </d-cell>
    <d-cell title="显示图标">
      <template #left-icon>
        <tips-outlined color="#f00" size="small" />
      </template>
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
    <d-cell title="超长文字展示" label-align="right">
      <d-input v-model="value" placeholder="请输入文字" />
    </d-cell>
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
