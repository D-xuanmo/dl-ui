import { FunctionalComponent } from 'vue'
import Icon, { IconProps } from '../components'
import ArrowDownFilledSvg from '../svg/filled/arrow-down.svg'

export type ArrowDownFilledProps = FunctionalComponent<IconProps>

const ArrowDownFilled: ArrowDownFilledProps = (props) => {
  return (
    <Icon {...props}>
      <ArrowDownFilledSvg />
    </Icon>
  )
}

export default ArrowDownFilled
