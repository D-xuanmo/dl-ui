import { FunctionalComponent } from 'vue'
import Icon, { IconProps } from '../components'
import BorderCircleOutlinedSvg from '../svg/outlined/border-circle.svg'

export type BorderCircleOutlinedProps = FunctionalComponent<IconProps>

const BorderCircleOutlined: BorderCircleOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <BorderCircleOutlinedSvg />
    </Icon>
  )
}

export default BorderCircleOutlined
