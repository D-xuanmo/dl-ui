import { FunctionalComponent } from 'vue'
import SearchOutlinedSvg from '../svg/outlined/search.svg'
import Icon, { IconProps } from '../components'

export type SearchOutlinedProps = FunctionalComponent<IconProps>

const SearchOutlined: SearchOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <SearchOutlinedSvg />
    </Icon>
  )
}

export default SearchOutlined
