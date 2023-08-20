import { FunctionalComponent } from 'vue'
import LightOutlinedSvg from '../svg/outlined/light.svg'
import Icon, { IconProps } from '../components'

export type LightOutlinedProps = FunctionalComponent<IconProps>

const LightOutlined: LightOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LightOutlinedSvg />
    </Icon>
  )
}

export default LightOutlined
