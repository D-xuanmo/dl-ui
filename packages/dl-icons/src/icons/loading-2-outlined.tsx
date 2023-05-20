import { FunctionalComponent } from 'vue'
import Loading2OutlinedSvg from '../svg/outlined/loading-2.svg'
import Icon, { IconProps } from '../components'

export type Loading2OutlinedProps = FunctionalComponent<IconProps>

const Loading2Outlined: Loading2OutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <Loading2OutlinedSvg />
    </Icon>
  )
}

export default Loading2Outlined
