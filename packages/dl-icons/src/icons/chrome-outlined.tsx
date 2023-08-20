import { FunctionalComponent } from 'vue'
import ChromeOutlinedSvg from '../svg/outlined/chrome.svg'
import Icon, { IconProps } from '../components'

export type ChromeOutlinedProps = FunctionalComponent<IconProps>

const ChromeOutlined: ChromeOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ChromeOutlinedSvg />
    </Icon>
  )
}

export default ChromeOutlined
