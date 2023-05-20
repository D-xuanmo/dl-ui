import { FunctionalComponent } from 'vue'
import DoubleLeftOutlinedSvg from '../svg/outlined/double-left.svg'
import Icon, { IconProps } from '../components'

export type DoubleLeftOutlinedProps = FunctionalComponent<IconProps>

const DoubleLeftOutlined: DoubleLeftOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DoubleLeftOutlinedSvg />
    </Icon>
  )
}

export default DoubleLeftOutlined
