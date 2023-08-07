import { FunctionalComponent } from 'vue'
import BookmarkOutlinedSvg from '../svg/outlined/bookmark.svg'
import Icon, { IconProps } from '../components'

export type BookmarkOutlinedProps = FunctionalComponent<IconProps>

const BookmarkOutlined: BookmarkOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <BookmarkOutlinedSvg />
    </Icon>
  )
}

export default BookmarkOutlined
