import { FunctionalComponent } from 'vue'
import StarFilledSvg from '../svg/filled/star.svg'
import Icon, { IconProps } from '../components'

export type StarFilledProps = FunctionalComponent<IconProps>

const StarFilled: StarFilledProps = (props) => {
  return (
    <Icon {...props}>
      <StarFilledSvg />
    </Icon>
  )
}

export default StarFilled
