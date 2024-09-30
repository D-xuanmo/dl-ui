import { FunctionalComponent } from 'vue'
import AlignLeftOutlinedSvg from '../svg/outlined/align-left.svg'
import Icon, { IconProps } from '../components'

export type AlignLeftOutlinedProps = FunctionalComponent<IconProps>

export const AlignLeftOutlined: AlignLeftOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignLeftOutlinedSvg />
    </Icon>
  )
}
