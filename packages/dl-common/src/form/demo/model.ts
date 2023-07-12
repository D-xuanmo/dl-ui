import { dCookie } from '@xuanmo/utils'
import CustomInput from './custom-input.vue'
import { IFormModelItem } from '../types'

const FORM_MODEL: Partial<IFormModelItem>[] = [
  {
    id: 'basicGroup',
    label: '内置组件',
    component: 'DFormCellGroup',
    layout: {
      parent: 'root',
      children: [
        'input',
        'textarea',
        'disabledInput',
        'email',
        'switch',
        'rate',
        'calendarSingle',
        'calendarMultiple',
        'calendarRange',
        'picker',
        'multiPicker',
        'cascaderPicker',
        'cascader',
        'datePicker',
        'timePicker',
        'radio',
        'checkbox',
        'upload'
      ]
    }
  },
  {
    id: 'customGroup',
    label: '自定义组件',
    component: 'DFormCellGroup',
    layout: {
      parent: 'root',
      children: ['customInput', 'customInput1']
    }
  },
  {
    id: 'input',
    dataKey: 'input',
    component: 'DInput',
    label: '输入框',
    value: '',
    description: '1、这是一段很长很长的备注。\n2、我这一段备注不仅长而且有两行',
    required: true,
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      placeholder: '请输入文字'
    }
  },
  {
    id: 'textarea',
    dataKey: 'textarea',
    component: 'DTextarea',
    label: '多行文本框',
    value: '',
    required: true,
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      placeholder: '请输入文字',
      maxlength: 80,
      showWordLimit: true
    }
  },
  {
    id: 'disabledInput',
    dataKey: 'disabledInput',
    component: 'DInput',
    label: '被禁用的输入框',
    value: '',
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      placeholder: '这个输入框被禁用了',
      disabled: true
    }
  },
  {
    id: 'email',
    dataKey: 'email',
    component: 'DInput',
    label: '邮箱',
    value: '',
    rules: 'required|email',
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      placeholder: '请输入邮箱'
    }
  },
  {
    id: 'switch',
    dataKey: 'switch',
    component: 'DSwitch',
    label: '开关',
    layout: {
      parent: 'basicGroup'
    },
    value: false
  },
  {
    id: 'rate',
    dataKey: 'rate',
    component: 'DRate',
    label: '评分',
    layout: {
      parent: 'basicGroup'
    },
    value: 0
  },
  {
    id: 'calendarSingle',
    dataKey: 'calendarSingle',
    component: 'DCalendar',
    label: '日历单选',
    layout: {
      parent: 'basicGroup'
    },
    value: '',
    otherProps: {
      placeholder: '请选择',
      minDate: new Date(2023, 0, 1)
    }
  },
  {
    id: 'calendarMultiple',
    dataKey: 'calendarMultiple',
    component: 'DCalendar',
    label: '日历多选',
    layout: {
      parent: 'basicGroup'
    },
    value: '',
    otherProps: {
      placeholder: '请选择',
      type: 'multiple',
      minDate: new Date(2023, 0, 1)
    }
  },
  {
    id: 'calendarRange',
    dataKey: 'calendarRange',
    component: 'DCalendar',
    label: '日历区间',
    layout: {
      parent: 'basicGroup'
    },
    value: '',
    otherProps: {
      placeholder: '请选择',
      type: 'range',
      minDate: new Date(2023, 0, 1)
    }
  },
  {
    id: 'picker',
    dataKey: 'picker',
    component: 'DPicker',
    label: '选择器',
    value: [],
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' }
      ]
    }
  },
  {
    id: 'multiPicker',
    dataKey: 'multiPicker',
    component: 'DPicker',
    label: '多列选择器',
    value: ['1', '2-2'],
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
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
    id: 'cascaderPicker',
    dataKey: 'cascaderPicker',
    component: 'DPicker',
    label: '树形选择',
    value: ['110000000000', '110100000000', '110102000000'],
    // value 也可以是对象数组
    // value: [
    //   { value: '110000000000', label: '北京市' },
    //   { value: '110100000000', label: '市辖区' },
    //   { value: '110102000000', label: '西城区' }
    // ],
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      title: '使用选择器模拟级联选择',
      placeholder: '数据加载中...',
      options: []
    }
  },
  {
    id: 'cascader',
    dataKey: 'cascader',
    component: 'DCascader',
    label: '级联选择',
    value: ['110000000000', '110100000000', '110102000000', '110102007000'],
    // value 也可以是对象数组
    // value: [
    //   { value: '110000000000', label: '北京市' },
    //   { value: '110100000000', label: '市辖区' },
    //   { value: '110102000000', label: '西城区' }
    // ],
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      placeholder: '数据加载中...',
      options: []
    }
  },
  {
    id: 'datePicker',
    dataKey: 'datePicker',
    component: 'DDateTimePicker',
    label: '日期选择器',
    layout: {
      parent: 'basicGroup'
    },
    value: '2022/4/15'
  },
  {
    id: 'timePicker',
    dataKey: 'timePicker',
    component: 'DDateTimePicker',
    label: '日期选择器',
    layout: {
      parent: 'basicGroup'
    },
    value: '22:58',
    otherProps: {
      type: 'time'
    }
  },
  {
    id: 'radio',
    dataKey: 'radio',
    component: 'DRadioGroup',
    label: '单选框',
    value: '2',
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      direction: 'horizontal',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' }
      ]
    }
  },
  {
    id: 'checkbox',
    dataKey: 'checkbox',
    component: 'DCheckboxGroup',
    label: '复选框',
    value: ['1'],
    layout: {
      parent: 'basicGroup'
    },
    otherProps: {
      direction: 'horizontal',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' }
      ]
    }
  },
  {
    id: 'upload',
    dataKey: 'upload',
    component: 'DUpload',
    label: '上传',
    layout: {
      parent: 'basicGroup'
    },
    value: [
      {
        url: 'https://www.xuanmo.xin/api/file-server/read-file/cf5be5e5-a84b-41e9-b91a-c99646039f15'
      }
    ],
    otherProps: {
      action: '/api/file-server/p/upload',
      data: {
        type: 'media'
      },
      headerParams: {
        'X-XSRF-TOKEN': dCookie().getItem('csrfToken')
      },
      uploadAfter(response: any) {
        // 返回上传组件需要的格式
        return {
          url: (response as any).data?.[0].url,
          deletable: true
        }
      }
    }
  },
  {
    id: 'customInput',
    dataKey: 'customInput',
    component: 'CustomInput',
    label: '自定义组件',
    value: '',
    required: true,
    layout: {
      parent: 'customGroup'
    },
    description: '可以实现很多目前不支持的场景'
  },
  {
    id: 'customInput1',
    dataKey: 'customInput1',
    component: CustomInput,
    label: '自定义组件1',
    value: '',
    required: true,
    layout: {
      parent: 'customGroup'
    },
    description: '直接传入一个 Vue 组件'
  }
]

export default FORM_MODEL