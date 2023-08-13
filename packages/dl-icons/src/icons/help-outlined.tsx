import { FunctionalComponent } from 'vue'
import HelpOutlinedSvg from '../svg/outlined/help.svg'
import Icon, { IconProps } from '../components'

export type HelpOutlinedProps = FunctionalComponent<IconProps>

const HelpOutlined: HelpOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <HelpOutlinedSvg />
    </Icon>
  )
}

export default HelpOutlined
