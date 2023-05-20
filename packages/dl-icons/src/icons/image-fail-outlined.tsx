import { FunctionalComponent } from 'vue'
import ImageFailOutlinedSvg from '../svg/outlined/image-fail.svg'
import Icon, { IconProps } from '../components'

export type ImageFailOutlinedProps = FunctionalComponent<IconProps>

const ImageFailOutlined: ImageFailOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ImageFailOutlinedSvg />
    </Icon>
  )
}

export default ImageFailOutlined
