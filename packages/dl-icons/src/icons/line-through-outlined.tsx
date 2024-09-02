import { FunctionalComponent } from 'vue'
import LineThroughOutlinedSvg from '../svg/outlined/line-through.svg'
import Icon, { IconProps } from '../components'

export type LineThroughOutlinedProps = FunctionalComponent<IconProps>

const LineThroughOutlined: LineThroughOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LineThroughOutlinedSvg />
    </Icon>
  )
}

export default LineThroughOutlined
