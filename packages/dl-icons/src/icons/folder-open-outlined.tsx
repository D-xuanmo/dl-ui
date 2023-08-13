import { FunctionalComponent } from 'vue'
import FolderOpenOutlinedSvg from '../svg/outlined/folder-open.svg'
import Icon, { IconProps } from '../components'

export type FolderOpenOutlinedProps = FunctionalComponent<IconProps>

const FolderOpenOutlined: FolderOpenOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FolderOpenOutlinedSvg />
    </Icon>
  )
}

export default FolderOpenOutlined
