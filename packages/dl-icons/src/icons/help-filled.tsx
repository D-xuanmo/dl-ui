import { FunctionalComponent } from 'vue'
import HelpFilledSvg from '../svg/filled/help.svg'
import Icon, { IconProps } from '../components'

export type HelpFilledProps = FunctionalComponent<IconProps>

const HelpFilled: HelpFilledProps = (props) => {
  return (
    <Icon {...props}>
      <HelpFilledSvg />
    </Icon>
  )
}

export default HelpFilled
