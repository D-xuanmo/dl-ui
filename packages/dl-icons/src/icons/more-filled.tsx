import { FunctionalComponent } from 'vue'
import MoreFilledSvg from '../svg/filled/more.svg'
import Icon, { IconProps } from '../components'

export type MoreFilledProps = FunctionalComponent<IconProps>

const MoreFilled: MoreFilledProps = (props) => {
  return (
    <Icon {...props}>
      <MoreFilledSvg />
    </Icon>
  )
}

export default MoreFilled
