import { FunctionalComponent } from 'vue'
import MessageOutlinedSvg from '../svg/outlined/message.svg'
import Icon, { IconProps } from '../components'

export type MessageOutlinedProps = FunctionalComponent<IconProps>

export const MessageOutlined: MessageOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <MessageOutlinedSvg />
    </Icon>
  )
}
