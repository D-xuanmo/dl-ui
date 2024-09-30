import { FunctionalComponent } from 'vue'
import DirectionVerticalROutlinedSvg from '../svg/outlined/direction-vertical-r.svg'
import Icon, { IconProps } from '../components'

export type DirectionVerticalROutlinedProps = FunctionalComponent<IconProps>

export const DirectionVerticalROutlined: DirectionVerticalROutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DirectionVerticalROutlinedSvg />
    </Icon>
  )
}
