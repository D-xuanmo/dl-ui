import { FunctionalComponent } from 'vue'
import HeartOutlinedSvg from '../svg/outlined/heart.svg'
import Icon, { IconProps } from '../components'

export type HeartOutlinedProps = FunctionalComponent<IconProps>

const HeartOutlined: HeartOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <HeartOutlinedSvg />
    </Icon>
  )
}

export default HeartOutlined
