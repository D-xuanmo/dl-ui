import { FunctionalComponent } from 'vue'
import DarkOutlinedSvg from '../svg/outlined/dark.svg'
import Icon, { IconProps } from '../components'

export type DarkOutlinedProps = FunctionalComponent<IconProps>

const DarkOutlined: DarkOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DarkOutlinedSvg />
    </Icon>
  )
}

export default DarkOutlined
