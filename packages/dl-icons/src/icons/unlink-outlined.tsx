import { FunctionalComponent } from 'vue'
import UnlinkOutlinedSvg from '../svg/outlined/unlink.svg'
import Icon, { IconProps } from '../components'

export type UnlinkOutlinedProps = FunctionalComponent<IconProps>

const UnlinkOutlined: UnlinkOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <UnlinkOutlinedSvg />
    </Icon>
  )
}

export default UnlinkOutlined
