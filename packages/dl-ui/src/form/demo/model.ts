import { InputProps } from '../../input'
import { PickerProps } from '../../picker'
import { RadioGroupProps } from '../../radio-group'
import { UploadProps } from '../../upload'
import { dCookie } from '@xuanmo/javascript-utils'
import CustomInput from './custom-input.vue'
import { FormStoreInitialConfig } from '../store'
import { TextareaProps } from '../../textarea'
import { CascaderProps } from '../../cascader'
import { CalendarProps } from '../../calendar'
import { DateTimePickerProps } from '../../date-time-picker'

const FORM_MODEL: FormStoreInitialConfig = {
  groups: [
    { id: 'basic', title: '内置组件' },
    { id: 'extend', title: '扩展功能' }
  ],
  models: [
    {
      name: 'input',
      component: 'DInput',
      label: '输入框',
      value: '',
      description: '1、这是一段很长很长的备注。\n2、我这一段备注不仅长而且有两行',
      required: true,
      groupId: 'basic',
      otherProps: <InputProps>{
        placeholder: '请输入文字'
      }
    },
    {
      name: 'textarea',
      component: 'DTextarea',
      label: '多行文本框',
      value: '',
      required: true,
      groupId: 'basic',
      otherProps: <TextareaProps>{
        placeholder: '请输入文字',
        maxlength: 80,
        showWordLimit: true
      }
    },
    {
      name: 'disableInput',
      component: 'DInput',
      label: '被禁用的输入框',
      value: '',

      groupId: 'basic',
      otherProps: <InputProps>{
        placeholder: '这个输入框被禁用了',
        disabled: true
      }
    },
    {
      name: 'email',
      component: 'DInput',
      label: '邮箱',
      value: '',
      rules: 'required|email',
      groupId: 'basic',
      otherProps: <InputProps>{
        placeholder: '请输入邮箱'
      }
    },
    {
      name: 'switch',
      component: 'DSwitch',
      label: '开关',
      groupId: 'basic',
      value: false
    },
    {
      name: 'rate',
      component: 'DRate',
      label: '评分',
      groupId: 'basic',
      value: 0
    },
    {
      name: 'calendarSingle',
      component: 'DCalendar',
      label: '日历单选',
      groupId: 'basic',
      value: '',
      otherProps: <CalendarProps>{
        placeholder: '请选择',
        minDate: new Date(2023, 0, 1)
      }
    },
    {
      name: 'calendarMultiple',
      component: 'DCalendar',
      label: '日历多选',
      groupId: 'basic',
      value: '',
      otherProps: <CalendarProps>{
        placeholder: '请选择',
        type: 'multiple',
        minDate: new Date(2023, 0, 1)
      }
    },
    {
      name: 'calendarRange',
      component: 'DCalendar',
      label: '日历区间',
      groupId: 'basic',
      value: '',
      otherProps: <CalendarProps>{
        placeholder: '请选择',
        type: 'range',
        minDate: new Date(2023, 0, 1)
      }
    },
    {
      name: 'picker',
      component: 'DPicker',
      label: '选择器',
      value: [],
      groupId: 'basic',
      otherProps: <PickerProps>{
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ]
      }
    },
    {
      name: 'multiPicker',
      component: 'DPicker',
      label: '多列选择器',
      value: ['1', '2-2'],
      groupId: 'basic',
      otherProps: <PickerProps>{
        title: '多列选择器',
        options: [
          [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
            { label: '选项3', value: '3' }
          ],
          [
            { label: '选项1-1', value: '1-1' },
            { label: '选项2-2', value: '2-2' },
            { label: '选项3-3', value: '3-3' }
          ]
        ]
      }
    },
    {
      name: 'cascaderPicker',
      component: 'DPicker',
      label: '树形选择',
      value: ['110000000000', '110100000000', '110102000000'],
      // value 也可以是对象数组
      // value: [
      //   { value: '110000000000', label: '北京市' },
      //   { value: '110100000000', label: '市辖区' },
      //   { value: '110102000000', label: '西城区' }
      // ],
      groupId: 'basic',
      otherProps: <Partial<PickerProps>>{
        title: '使用选择器模拟级联选择',
        placeholder: '数据加载中...',
        options: []
      }
    },
    {
      name: 'cascader',
      component: 'DCascader',
      label: '级联选择',
      value: ['110000000000', '110100000000', '110102000000', '110102007000'],
      // value 也可以是对象数组
      // value: [
      //   { value: '110000000000', label: '北京市' },
      //   { value: '110100000000', label: '市辖区' },
      //   { value: '110102000000', label: '西城区' }
      // ],
      groupId: 'basic',
      otherProps: <Partial<CascaderProps>>{
        placeholder: '数据加载中...',
        options: []
      }
    },
    {
      name: 'datePicker',
      component: 'DDateTimePicker',
      label: '日期选择器',
      groupId: 'basic',
      value: '2022/4/15'
    },
    {
      name: 'timePicker',
      component: 'DDateTimePicker',
      label: '日期选择器',
      groupId: 'basic',
      value: '22:58',
      otherProps: <DateTimePickerProps>{
        type: 'time'
      }
    },
    {
      name: 'radio',
      component: 'DRadioGroup',
      label: '单选框',
      value: '2',
      groupId: 'basic',
      otherProps: <RadioGroupProps>{
        direction: 'horizontal',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ]
      }
    },
    {
      name: 'checkbox',
      component: 'DCheckboxGroup',
      label: '复选框',
      value: ['1'],
      groupId: 'basic',
      otherProps: <RadioGroupProps>{
        direction: 'horizontal',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' }
        ]
      }
    },
    {
      name: 'upload',
      component: 'DUpload',
      label: '上传',
      groupId: 'basic',
      value: [
        {
          url: 'https://www.xuanmo.xin/api/file-server/read-file/cf5be5e5-a84b-41e9-b91a-c99646039f15'
        }
      ],
      otherProps: <Partial<UploadProps>>{
        action: '/api/file-server/p/upload',
        data: {
          type: 'media'
        },
        headerParams: {
          'X-XSRF-TOKEN': dCookie().getItem('csrfToken')
        },
        uploadAfter(response) {
          // 返回上传组件需要的格式
          return {
            url: (response as any).data?.[0].url,
            deletable: true
          }
        }
      }
    },
    {
      name: 'customInput',
      component: 'CustomInput',
      label: '自定义组件',
      value: '',
      required: true,
      groupId: 'extend',
      description: '可以实现很多目前不支持的场景'
    },
    {
      name: 'customInput1',
      component: CustomInput,
      label: '自定义组件1',
      value: '',
      required: true,
      groupId: 'extend',
      description: '直接传入一个 Vue 组件'
    }
  ]
}

export default FORM_MODEL
