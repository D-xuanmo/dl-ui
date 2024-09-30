import { FunctionalComponent } from 'vue'
import AlignBaselineOutlinedSvg from '../svg/outlined/align-baseline.svg'
import Icon, { IconProps } from '../components'

export type AlignBaselineOutlinedProps = FunctionalComponent<IconProps>

export const AlignBaselineOutlined: AlignBaselineOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignBaselineOutlinedSvg />
    </Icon>
  )
}
