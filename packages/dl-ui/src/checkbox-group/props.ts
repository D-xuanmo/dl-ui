import { ExtractPropTypes, PropType } from 'vue'
import { IData, DirectionType, COMMON_PROPS, pickProps } from '@xuanmo/dl-common'

export type CheckboxGroupProps = ExtractPropTypes<typeof CHECKBOX_GROUP_PROPS>

export const CHECKBOX_GROUP_PROPS = {
  ...pickProps(COMMON_PROPS, ['disabled', 'readonly', 'keys']),
  modelValue: {
    type: [Array] as PropType<(string | number)[]>,
    required: true
  },
  direction: {
    type: String as PropType<DirectionType>,
    default: 'vertical'
  },
  options: {
    type: Array as PropType<Array<IData> | undefined>,
    default: undefined
  },

  /**
   * 最大选择个数
   */
  max: Number
}
