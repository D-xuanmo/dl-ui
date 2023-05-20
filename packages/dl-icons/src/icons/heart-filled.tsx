import { FunctionalComponent } from 'vue'
import HeartFilledSvg from '../svg/filled/heart.svg'
import Icon, { IconProps } from '../components'

export type HeartFilledProps = FunctionalComponent<IconProps>

const HeartFilled: HeartFilledProps = (props) => {
  return (
    <Icon {...props}>
      <HeartFilledSvg />
    </Icon>
  )
}

export default HeartFilled
