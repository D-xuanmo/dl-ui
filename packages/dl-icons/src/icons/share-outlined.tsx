import { FunctionalComponent } from 'vue'
import ShareOutlinedSvg from '../svg/outlined/share.svg'
import Icon, { IconProps } from '../components'

export type ShareOutlinedProps = FunctionalComponent<IconProps>

const ShareOutlined: ShareOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ShareOutlinedSvg />
    </Icon>
  )
}

export default ShareOutlined
