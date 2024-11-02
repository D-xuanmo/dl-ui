import { FunctionalComponent } from 'vue'
import RefreshOutlinedSvg from '../svg/outlined/refresh.svg'
import Icon, { IconProps } from '../components'

export type RefreshOutlinedProps = FunctionalComponent<IconProps>

export const RefreshOutlined: RefreshOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <RefreshOutlinedSvg />
    </Icon>
  )
}
