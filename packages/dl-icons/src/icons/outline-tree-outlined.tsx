import { FunctionalComponent } from 'vue'
import OutlineTreeOutlinedSvg from '../svg/outlined/outline-tree.svg'
import Icon, { IconProps } from '../components'

export type OutlineTreeOutlinedProps = FunctionalComponent<IconProps>

const OutlineTreeOutlined: OutlineTreeOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <OutlineTreeOutlinedSvg />
    </Icon>
  )
}

export default OutlineTreeOutlined
