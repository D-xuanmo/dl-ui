import { FunctionalComponent } from 'vue'
import ReturnArrowOutlinedSvg from '../svg/outlined/return-arrow.svg'
import Icon, { IconProps } from '../components'

export type ReturnArrowOutlinedProps = FunctionalComponent<IconProps>

export const ReturnArrowOutlined: ReturnArrowOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ReturnArrowOutlinedSvg />
    </Icon>
  )
}
