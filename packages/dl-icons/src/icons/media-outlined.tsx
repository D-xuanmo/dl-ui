import { FunctionalComponent } from 'vue'
import MediaOutlinedSvg from '../svg/outlined/media.svg'
import Icon, { IconProps } from '../components'

export type MediaOutlinedProps = FunctionalComponent<IconProps>

export const MediaOutlined: MediaOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <MediaOutlinedSvg />
    </Icon>
  )
}
