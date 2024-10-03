import { FunctionalComponent } from 'vue'
import LayoutOutlinedSvg from '../svg/outlined/layout.svg'
import Icon, { IconProps } from '../components'

export type LayoutOutlinedProps = FunctionalComponent<IconProps>

export const LayoutOutlined: LayoutOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LayoutOutlinedSvg />
    </Icon>
  )
}
