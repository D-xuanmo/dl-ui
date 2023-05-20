import { FunctionalComponent } from 'vue'
import DownOutlinedSvg from '../svg/outlined/down.svg'
import Icon, { IconProps } from '../components'

export type DownOutlinedProps = FunctionalComponent<IconProps>

const DownOutlined: DownOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DownOutlinedSvg />
    </Icon>
  )
}

export default DownOutlined
