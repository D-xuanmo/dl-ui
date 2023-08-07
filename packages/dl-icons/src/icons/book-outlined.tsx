import { FunctionalComponent } from 'vue'
import BookOutlinedSvg from '../svg/outlined/book.svg'
import Icon, { IconProps } from '../components'

export type BookOutlinedProps = FunctionalComponent<IconProps>

const BookOutlined: BookOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <BookOutlinedSvg />
    </Icon>
  )
}

export default BookOutlined
