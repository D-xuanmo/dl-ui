import { FunctionalComponent } from 'vue'
import AlignTopOutlinedSvg from '../svg/outlined/align-top.svg'
import Icon, { IconProps } from '../components'

export type AlignTopOutlinedProps = FunctionalComponent<IconProps>

export const AlignTopOutlined: AlignTopOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <AlignTopOutlinedSvg />
    </Icon>
  )
}
