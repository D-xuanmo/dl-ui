import { FunctionalComponent } from 'vue'
import ImageOutlinedSvg from '../svg/outlined/image.svg'
import Icon, { IconProps } from '../components'

export type ImageOutlinedProps = FunctionalComponent<IconProps>

const ImageOutlined: ImageOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ImageOutlinedSvg />
    </Icon>
  )
}

export default ImageOutlined
