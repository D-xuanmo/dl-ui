import { FunctionalComponent } from 'vue'
import AlignJustifyVOutlinedSvg from '../svg/outlined/align-justify-v.svg'
import Icon, { IconProps } from '../components'

export type AlignJustifyVOutlinedProps = FunctionalComponent<IconProps>

export const AlignJustifyVOutlined: AlignJustifyVOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignJustifyVOutlinedSvg />
    </Icon>
  )
}
