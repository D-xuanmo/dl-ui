import { FunctionalComponent } from 'vue'
import FlexNoWrapOutlinedSvg from '../svg/outlined/flex-nowrap.svg'
import Icon, { IconProps } from '../components'

export type FlexNoWrapOutlinedProps = FunctionalComponent<IconProps>

export const FlexNoWrapOutlined: FlexNoWrapOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FlexNoWrapOutlinedSvg />
    </Icon>
  )
}
