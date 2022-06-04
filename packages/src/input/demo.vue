<template>
  <DCellGroup title="基础用法">
    <DInput
      v-model="value"
      label="输入框"
      placeholder="请输入文字"
      @blur="onBlur"
    />
    <DInput
      v-model="value"
      placeholder="无标题显示"
      hideLabel
    />
  </DCellGroup>
  <DCellGroup title="禁用、只读状态">
    <DInput
      v-model="value"
      label="输入框禁用"
      placeholder="请输入文字"
      readonly
    />
    <DInput
      v-model="value"
      label="输入框禁用"
      placeholder="请输入文字"
      disabled
    />
  </DCellGroup>
  <DCellGroup title="字数限制">
    <DInput
      v-model="value"
      label="输入框"
      placeholder="请输入文字"
      :maxlength="10"
    />
  </DCellGroup>
  <DCellGroup title="扩展类型">
    <DInput
      label="密码"
      placeholder="请输入密码"
      type="password"
    />
    <DInput
      v-model="number"
      label="数字输入框"
      placeholder="请输入密码"
      type="number"
    />
    <DInput
      v-model="value"
      label="邮箱"
      placeholder="请输入邮箱"
      type="email"
    />
    <DInput
      v-model="value"
      label="单价"
      placeholder="请输入文字"
      suffix="元"
    />
    <DInput
      v-model="value"
      label="单价"
      placeholder="请输入文字"
      suffix="元"
    >
      <template #suffix>slot 形式</template>
    </DInput>
  </DCellGroup>
  <DCellGroup title="其他设置">
    <DInput
      v-model="value"
      label="显示冒号"
      placeholder="请输入文字"
      colon
    />
    <DInput
      v-model="value"
      label="可被清除"
      placeholder="请输入文字"
      clearable
    />
    <DInput
      v-model="value"
      label="显示图标"
      placeholder="请输入文字"
      left-icon="tips-o"
      left-icon-color="#f00"
    />
    <DInput
      v-model="value"
      label="图标大小"
      placeholder="请输入文字"
      left-icon="tips-o"
      left-icon-color="#f00"
      left-icon-size="small"
    />
    <DInput
      v-model="value"
      label="超长文字展示"
      placeholder="请输入文字"
      label-align="right"
    />
  </DCellGroup>
</template>

<script
  lang="ts"
  setup
>
import { ref } from 'vue'
const value = ref('')
const number = ref('')

function onBlur(value) {
  console.log(value)
}
</script>
