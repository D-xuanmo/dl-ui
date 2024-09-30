import { FunctionalComponent } from 'vue'
import AlignRightOutlinedSvg from '../svg/outlined/align-right.svg'
import Icon, { IconProps } from '../components'

export type AlignRightOutlinedProps = FunctionalComponent<IconProps>

export const AlignRightOutlined: AlignRightOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignRightOutlinedSvg />
    </Icon>
  )
}
