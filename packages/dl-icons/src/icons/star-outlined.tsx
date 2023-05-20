import { FunctionalComponent } from 'vue'
import StarOutlinedSvg from '../svg/outlined/star.svg'
import Icon, { IconProps } from '../components'

export type StarOutlinedProps = FunctionalComponent<IconProps>

const StarOutlined: StarOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <StarOutlinedSvg />
    </Icon>
  )
}

export default StarOutlined
