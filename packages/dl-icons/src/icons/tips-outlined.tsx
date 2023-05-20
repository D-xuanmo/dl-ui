import { FunctionalComponent } from 'vue'
import TipsOutlinedSvg from '../svg/outlined/tips.svg'
import Icon, { IconProps } from '../components'

export type TipsOutlinedProps = FunctionalComponent<IconProps>

const TipsOutlined: TipsOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TipsOutlinedSvg />
    </Icon>
  )
}

export default TipsOutlined
