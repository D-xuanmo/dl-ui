import { FunctionalComponent } from 'vue'
import LoadingOutlinedSvg from '../svg/outlined/loading.svg'
import Icon, { IconProps } from '../components'

export type LoadingOutlinedProps = FunctionalComponent<IconProps>

const LoadingOutlined: LoadingOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LoadingOutlinedSvg />
    </Icon>
  )
}

export default LoadingOutlined
