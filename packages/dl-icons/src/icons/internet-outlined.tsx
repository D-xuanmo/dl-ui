import { FunctionalComponent } from 'vue'
import InternetOutlinedSvg from '../svg/outlined/internet.svg'
import Icon, { IconProps } from '../components'

export type InternetOutlinedProps = FunctionalComponent<IconProps>

const InternetOutlined: InternetOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <InternetOutlinedSvg />
    </Icon>
  )
}

export default InternetOutlined
