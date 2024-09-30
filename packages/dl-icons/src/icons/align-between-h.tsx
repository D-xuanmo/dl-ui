import { FunctionalComponent } from 'vue'
import AlignBetweenHOutlinedSvg from '../svg/outlined/align-between-h.svg'
import Icon, { IconProps } from '../components'

export type AlignBetweenHOutlinedProps = FunctionalComponent<IconProps>

export const AlignBetweenHOutlined: AlignBetweenHOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignBetweenHOutlinedSvg />
    </Icon>
  )
}
