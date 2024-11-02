import { FunctionalComponent } from 'vue'
import UndoOutlinedSvg from '../svg/outlined/undo.svg'
import Icon, { IconProps } from '../components'

export type UndoOutlinedProps = FunctionalComponent<IconProps>

export const UndoOutlined: UndoOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <UndoOutlinedSvg />
    </Icon>
  )
}
