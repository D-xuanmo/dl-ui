import { FunctionalComponent } from 'vue'
import FolderOutlinedSvg from '../svg/outlined/folder.svg'
import Icon, { IconProps } from '../components'

export type FolderOutlinedProps = FunctionalComponent<IconProps>

const FolderOutlined: FolderOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FolderOutlinedSvg />
    </Icon>
  )
}

export default FolderOutlined
