import { FunctionalComponent } from 'vue'
import PlusOutlinedSvg from '../svg/outlined/plus.svg'
import Icon, { IconProps } from '../components'

export type PlusOutlinedProps = FunctionalComponent<IconProps>

const PlusOutlined: PlusOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <PlusOutlinedSvg />
    </Icon>
  )
}

export default PlusOutlined
