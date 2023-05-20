import { FunctionalComponent } from 'vue'
import TipsFilledSvg from '../svg/filled/tips.svg'
import Icon, { IconProps } from '../components'

export type TipsFilledProps = FunctionalComponent<IconProps>

const TipsFilled: TipsFilledProps = (props) => {
  return (
    <Icon {...props}>
      <TipsFilledSvg />
    </Icon>
  )
}

export default TipsFilled
