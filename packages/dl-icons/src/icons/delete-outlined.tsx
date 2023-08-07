import { FunctionalComponent } from 'vue'
import DeleteOutlinedSvg from '../svg/outlined/delete.svg'
import Icon, { IconProps } from '../components'

export type DeleteOutlinedProps = FunctionalComponent<IconProps>

const DeleteOutlined: DeleteOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <DeleteOutlinedSvg />
    </Icon>
  )
}

export default DeleteOutlined
