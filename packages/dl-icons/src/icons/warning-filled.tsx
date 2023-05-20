import { FunctionalComponent } from 'vue'
import WarningFilledSvg from '../svg/filled/warning.svg'
import Icon, { IconProps } from '../components'

export type WarningFilledProps = FunctionalComponent<IconProps>

const WarningFilled: WarningFilledProps = (props) => {
  return (
    <Icon {...props}>
      <WarningFilledSvg />
    </Icon>
  )
}

export default WarningFilled
