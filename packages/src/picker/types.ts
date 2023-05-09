import { PickerValue } from './props'

export type EventType = {
  'update:visible': (value: PickerValue) => void
  'update:model-value': (value: PickerValue) => void
  change: (value: PickerValue, data: any) => void
  confirm: (value: PickerValue) => void
  close: () => void
}
