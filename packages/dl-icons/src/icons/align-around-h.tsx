import { FunctionalComponent } from 'vue'
import AlignAroundHOutlinedSvg from '../svg/outlined/align-around-h.svg'
import Icon, { IconProps } from '../components'

export type AlignAroundHOutlinedProps = FunctionalComponent<IconProps>

export const AlignAroundHOutlined: AlignAroundHOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignAroundHOutlinedSvg />
    </Icon>
  )
}
