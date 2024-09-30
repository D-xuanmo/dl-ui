import { FunctionalComponent } from 'vue'
import AlignStretchOutlinedSvg from '../svg/outlined/align-stretch.svg'
import Icon, { IconProps } from '../components'

export type AlignStretchOutlinedProps = FunctionalComponent<IconProps>

export const AlignStretchOutlined: AlignStretchOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignStretchOutlinedSvg />
    </Icon>
  )
}
