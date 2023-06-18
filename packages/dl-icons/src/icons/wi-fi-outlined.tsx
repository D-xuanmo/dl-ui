import { FunctionalComponent } from 'vue'
import WiFiOutlinedSvg from '../svg/outlined/wi-fi.svg'
import Icon, { IconProps } from '../components'

export type WiFiOutlinedProps = FunctionalComponent<IconProps>

const WiFiOutlined: WiFiOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <WiFiOutlinedSvg />
    </Icon>
  )
}

export default WiFiOutlined
