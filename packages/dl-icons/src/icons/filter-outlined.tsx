import { FunctionalComponent } from 'vue'
import FilterOutlinedSvg from '../svg/outlined/filter.svg'
import Icon, { IconProps } from '../components'

export type FilterOutlinedProps = FunctionalComponent<IconProps>

const FilterOutlined: FilterOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FilterOutlinedSvg />
    </Icon>
  )
}

export default FilterOutlined
