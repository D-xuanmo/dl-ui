import { FunctionalComponent } from 'vue'
import GridOutlinedSvg from '../svg/outlined/grid.svg'
import Icon, { IconProps } from '../components'

export type GridOutlinedProps = FunctionalComponent<IconProps>

export const GridOutlined: GridOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <GridOutlinedSvg />
    </Icon>
  )
}
