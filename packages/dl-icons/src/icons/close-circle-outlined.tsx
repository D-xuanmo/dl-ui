import { FunctionalComponent } from 'vue'
import Icon, { IconProps } from '../components'
import CloseCircleOutlinedSvg from '../svg/outlined/close-circle.svg'

export type CloseCircleOutlinedProps = FunctionalComponent<IconProps>

const CloseCircleOutlined: CloseCircleOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CloseCircleOutlinedSvg />
    </Icon>
  )
}

export default CloseCircleOutlined
