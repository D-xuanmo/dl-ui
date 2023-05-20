import { FunctionalComponent } from 'vue'
import Icon, { IconProps } from '../components'
import CloseOutlinedSvg from '../svg/outlined/close.svg'

export type CloseOutlinedProps = FunctionalComponent<IconProps>

const CloseOutlined: CloseOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CloseOutlinedSvg />
    </Icon>
  )
}

export default CloseOutlined
