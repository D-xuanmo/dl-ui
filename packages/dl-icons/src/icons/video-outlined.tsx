import { FunctionalComponent } from 'vue'
import VideoOutlinedSvg from '../svg/outlined/video.svg'
import Icon, { IconProps } from '../components'

export type VideoOutlinedProps = FunctionalComponent<IconProps>

const VideoOutlined: VideoOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <VideoOutlinedSvg />
    </Icon>
  )
}

export default VideoOutlined
