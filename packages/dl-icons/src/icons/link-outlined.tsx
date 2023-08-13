import { FunctionalComponent } from 'vue'
import LinkOutlinedSvg from '../svg/outlined/link.svg'
import Icon, { IconProps } from '../components'

export type LinkOutlinedProps = FunctionalComponent<IconProps>

const LinkOutlined: LinkOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LinkOutlinedSvg />
    </Icon>
  )
}

export default LinkOutlined
