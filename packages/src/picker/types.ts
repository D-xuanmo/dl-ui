import { PickerValueType } from './props'

export type EventType = {
  'update:visible': (value: PickerValueType) => void
  'update:model-value': (value: PickerValueType) => void
  change: (value: PickerValueType, data: any) => void
  confirm: (value: PickerValueType) => void
  close: () => void
}
