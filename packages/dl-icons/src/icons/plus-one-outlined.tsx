import { FunctionalComponent } from 'vue'
import PlusOneOutlinedSvg from '../svg/outlined/plus-one.svg'
import Icon, { IconProps } from '../components'

export type PlusOneOutlinedProps = FunctionalComponent<IconProps>

export const PlusOneOutlined: PlusOneOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <PlusOneOutlinedSvg />
    </Icon>
  )
}
