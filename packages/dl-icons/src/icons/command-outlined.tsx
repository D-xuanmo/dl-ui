import { FunctionalComponent } from 'vue'
import CommandOutlinedSvg from '../svg/outlined/command.svg'
import Icon, { IconProps } from '../components'

export type CommandOutlinedProps = FunctionalComponent<IconProps>

export const CommandOutlined: CommandOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CommandOutlinedSvg />
    </Icon>
  )
}
