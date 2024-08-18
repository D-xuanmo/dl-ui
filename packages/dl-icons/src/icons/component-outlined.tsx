import { FunctionalComponent } from 'vue'
import ComponentOutlinedSvg from '../svg/outlined/component.svg'
import Icon, { IconProps } from '../components'

export type ComponentOutlinedProps = FunctionalComponent<IconProps>

const ComponentOutlined: ComponentOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ComponentOutlinedSvg />
    </Icon>
  )
}

export default ComponentOutlined
