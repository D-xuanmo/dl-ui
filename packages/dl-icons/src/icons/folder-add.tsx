import { FunctionalComponent } from 'vue'
import FolderAddOutlinedSvg from '../svg/outlined/folder-add.svg'
import Icon, { IconProps } from '../components'

export type FolderAddOutlinedProps = FunctionalComponent<IconProps>

export const FolderAddOutlined: FolderAddOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FolderAddOutlinedSvg />
    </Icon>
  )
}
