import { FunctionalComponent } from 'vue'
import Book1OutlinedSvg from '../svg/outlined/book-1.svg'
import Icon, { IconProps } from '../components'

export type Book1OutlinedProps = FunctionalComponent<IconProps>

const Book1Outlined: Book1OutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <Book1OutlinedSvg />
    </Icon>
  )
}

export default Book1Outlined
