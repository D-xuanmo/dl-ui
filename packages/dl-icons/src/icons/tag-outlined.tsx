import { FunctionalComponent } from 'vue'
import TagOutlinedSvg from '../svg/outlined/tag.svg'
import Icon, { IconProps } from '../components'

export type TagOutlinedProps = FunctionalComponent<IconProps>

const TagOutlined: TagOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TagOutlinedSvg />
    </Icon>
  )
}

export default TagOutlined
