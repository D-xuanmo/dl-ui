import { FunctionalComponent } from 'vue'
import LinkOpenOutlinedSvg from '../svg/outlined/link-open.svg'
import Icon, { IconProps } from '../components'

export type LinkOpenOutlinedProps = FunctionalComponent<IconProps>

const LinkOpenOutlined: LinkOpenOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LinkOpenOutlinedSvg />
    </Icon>
  )
}

export default LinkOpenOutlined
