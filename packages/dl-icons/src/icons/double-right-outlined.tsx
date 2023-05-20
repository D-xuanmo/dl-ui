import { FunctionalComponent } from 'vue'
import DoubleRightOutlinedSvg from '../svg/outlined/double-right.svg'
import Icon, { IconProps } from '../components'

export type DoubleRightOutlinedProps = FunctionalComponent<IconProps>

const DoubleRightOutlined: DoubleRightOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DoubleRightOutlinedSvg />
    </Icon>
  )
}

export default DoubleRightOutlined
