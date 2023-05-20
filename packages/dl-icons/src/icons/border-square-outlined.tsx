import { FunctionalComponent } from 'vue'
import Icon, { IconProps } from '../components'
import BorderSquareOutlinedSvg from '../svg/outlined/border-square.svg'

export type BorderSquareOutlinedProps = FunctionalComponent<IconProps>

const BorderSquareOutlined: BorderSquareOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <BorderSquareOutlinedSvg />
    </Icon>
  )
}

export default BorderSquareOutlined
