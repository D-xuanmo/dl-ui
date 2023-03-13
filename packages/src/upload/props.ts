import { PropType } from 'vue'

/**
 * 文件上传列表单条数据类型
 */
export type UploadListItemType = {
  /**
   * 文件地址
   */
  url: string

  /**
   * 是否允许删除
   */
  deletable: boolean

  /**
   * 上传状态
   */
  loading?: boolean

  /**
   * 上传失败
   */
  fail?: boolean
}

/**
 * 上传回调公用类型
 */
export type UploadCallbackParameters = (
  file: File,
  detail: {
    index: number
    files: File[]
  }
) => void

/**
 * 上传前拦截方法
 */
export type BeforeUploadType = (...rest: Parameters<UploadCallbackParameters>) => Promise<boolean>

/**
 * 上传后拦截方法
 */
export type AfterUploadType = (response: XMLHttpRequestResponseType) => UploadListItemType

export const uploadProps = {
  modelValue: {
    type: Array as PropType<UploadListItemType[]>,
    default: () => []
  },

  /**
   * 文件上传请求地址
   */
  action: String,

  /**
   * 文件允许上传的格式
   */
  accept: {
    type: String,
    default: 'image/*'
  },

  /**
   * 请求方式
   */
  method: {
    type: String,
    default: 'POST'
  },

  /**
   * 文件上传数据的 key，默认：file
   */
  uploadDataKey: {
    type: String,
    default: 'file'
  },

  /**
   * 请求额外数据
   */
  data: {
    type: Object,
    default: () => ({})
  },

  /**
   * 请求头数据
   */
  headerParams: {
    type: Object,
    default: () => ({})
  },

  /**
   * 是否开启多选，默认：false
   */
  multiple: {
    type: Boolean,
    default: false
  },

  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },

  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: false
  },

  /**
   * 是否展示删除按钮
   */
  deletable: {
    type: Boolean,
    default: true
  },

  /**
   * 相机调取模式
   */
  capture: {
    type: [String, Boolean] as PropType<'user' | 'environment' | boolean | undefined>,
    default: ''
  },

  /**
   * 上传大小限制，单位：byte
   */
  maxSize: {
    type: Number,
    default: Infinity
  },

  /**
   * 上传个数显示
   */
  maxCount: {
    type: Number,
    default: Infinity
  },

  /**
   * 预览区单个图片大小
   */
  previewSize: {
    type: [Number, String],
    default: 80
  },

  /**
   * 文件上传前回调函数，返回 false 终止上传
   */
  beforeUpload: {
    type: Function as PropType<BeforeUploadType>,
    default: undefined
  },

  /**
   * 文件上传成功回调，返回文件预览列表
   */
  uploadAfter: {
    type: Function as PropType<AfterUploadType>,
    default: undefined
  }
}

export const uploadListProps = {
  deletable: uploadProps.deletable,
  previewSize: uploadProps.previewSize,
  list: {
    type: Array as PropType<UploadListItemType[]>,
    default: () => []
  }
}
