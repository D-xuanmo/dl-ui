import { FunctionalComponent } from 'vue'
import MinusOutlinedSvg from '../svg/outlined/minus.svg'
import Icon, { IconProps } from '../components'

export type MinusOutlinedProps = FunctionalComponent<IconProps>

const MinusOutlined: MinusOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <MinusOutlinedSvg />
    </Icon>
  )
}

export default MinusOutlined
