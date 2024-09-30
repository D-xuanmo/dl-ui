import { FunctionalComponent } from 'vue'
import AlignBottomOutlinedSvg from '../svg/outlined/align-bottom.svg'
import Icon, { IconProps } from '../components'

export type AlignBottomOutlinedProps = FunctionalComponent<IconProps>

export const AlignBottomOutlined: AlignBottomOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignBottomOutlinedSvg />
    </Icon>
  )
}
