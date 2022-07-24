import { PickerValueType } from './props'

export type EventType = {
  'update:visible': (value: PickerValueType) => void
  'update:modelValue': (value: PickerValueType) => void
  change: (value: PickerValueType, data: any) => void
  confirm: (value: PickerValueType) => void
  close: () => void
}
