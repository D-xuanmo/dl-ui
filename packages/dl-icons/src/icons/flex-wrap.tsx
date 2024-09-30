import { FunctionalComponent } from 'vue'
import FlexWrapOutlinedSvg from '../svg/outlined/flex-wrap.svg'
import Icon, { IconProps } from '../components'

export type FlexWrapOutlinedProps = FunctionalComponent<IconProps>

export const FlexWrapOutlined: FlexWrapOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FlexWrapOutlinedSvg />
    </Icon>
  )
}
