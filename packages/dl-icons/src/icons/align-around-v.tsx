import { FunctionalComponent } from 'vue'
import AlignAroundVOutlinedSvg from '../svg/outlined/align-around-v.svg'
import Icon, { IconProps } from '../components'

export type AlignAroundVOutlinedProps = FunctionalComponent<IconProps>

export const AlignAroundVOutlined: AlignAroundVOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignAroundVOutlinedSvg />
    </Icon>
  )
}
