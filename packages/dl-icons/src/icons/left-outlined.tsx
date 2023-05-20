import { FunctionalComponent } from 'vue'
import LeftOutlinedSvg from '../svg/outlined/left.svg'
import Icon, { IconProps } from '../components'

export type LeftOutlinedProps = FunctionalComponent<IconProps>

const LeftOutlined: LeftOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LeftOutlinedSvg />
    </Icon>
  )
}

export default LeftOutlined
