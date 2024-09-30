import { FunctionalComponent } from 'vue'
import AlignCenterVOutlinedSvg from '../svg/outlined/align-center-v.svg'
import Icon, { IconProps } from '../components'

export type AlignCenterVOutlinedProps = FunctionalComponent<IconProps>

export const AlignCenterVOutlined: AlignCenterVOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignCenterVOutlinedSvg />
    </Icon>
  )
}
