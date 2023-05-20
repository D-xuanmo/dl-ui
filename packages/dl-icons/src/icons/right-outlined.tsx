import { FunctionalComponent } from 'vue'
import RightOutlinedSvg from '../svg/outlined/right.svg'
import Icon, { IconProps } from '../components'

export type RightOutlinedProps = FunctionalComponent<IconProps>

const RightOutlined: RightOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <RightOutlinedSvg />
    </Icon>
  )
}

export default RightOutlined
