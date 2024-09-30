import { FunctionalComponent } from 'vue'
import AlignCenterHOutlinedSvg from '../svg/outlined/align-center-h.svg'
import Icon, { IconProps } from '../components'

export type AlignCenterHOutlinedProps = FunctionalComponent<IconProps>

export const AlignCenterHOutlined: AlignCenterHOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignCenterHOutlinedSvg />
    </Icon>
  )
}
