import { FunctionalComponent } from 'vue'
import BorderOutlinedSvg from '../svg/outlined/border.svg'
import Icon, { IconProps } from '../components'

export type BorderOutlinedProps = FunctionalComponent<IconProps>

const BorderOutlined: BorderOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <BorderOutlinedSvg />
    </Icon>
  )
}

export default BorderOutlined
