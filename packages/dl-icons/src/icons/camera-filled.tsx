import { FunctionalComponent } from 'vue'
import CameraFilledSvg from '../svg/filled/camera.svg'
import Icon, { IconProps } from '../components'

export type CameraFilledProps = FunctionalComponent<IconProps>

const CameraFilled: CameraFilledProps = (props) => {
  return (
    <Icon {...props}>
      <CameraFilledSvg />
    </Icon>
  )
}

export default CameraFilled
