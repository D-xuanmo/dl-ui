import { FunctionalComponent } from 'vue'
import DirectionVerticalOutlinedSvg from '../svg/outlined/direction-vertical.svg'
import Icon, { IconProps } from '../components'

export type DirectionVerticalOutlinedProps = FunctionalComponent<IconProps>

export const DirectionVerticalOutlined: DirectionVerticalOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DirectionVerticalOutlinedSvg />
    </Icon>
  )
}
