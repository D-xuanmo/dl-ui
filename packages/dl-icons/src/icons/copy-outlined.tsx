import { FunctionalComponent } from 'vue'
import CopyOutlinedSvg from '../svg/outlined/copy.svg'
import Icon, { IconProps } from '../components'

export type CopyOutlinedProps = FunctionalComponent<IconProps>

const CopyOutlined: CopyOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CopyOutlinedSvg />
    </Icon>
  )
}

export default CopyOutlined
