import { FunctionalComponent } from 'vue'
import CloudOutlinedSvg from '../svg/outlined/cloud.svg'
import Icon, { IconProps } from '../components'

export type CloudOutlinedProps = FunctionalComponent<IconProps>

const CloudOutlined: CloudOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CloudOutlinedSvg />
    </Icon>
  )
}

export default CloudOutlined
