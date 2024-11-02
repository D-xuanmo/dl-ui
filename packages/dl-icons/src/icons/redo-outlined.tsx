import { FunctionalComponent } from 'vue'
import RedoOutlinedSvg from '../svg/outlined/redo.svg'
import Icon, { IconProps } from '../components'

export type RedoOutlinedProps = FunctionalComponent<IconProps>

export const RedoOutlined: RedoOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <RedoOutlinedSvg />
    </Icon>
  )
}
