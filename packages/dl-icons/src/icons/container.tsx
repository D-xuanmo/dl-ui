import { FunctionalComponent } from 'vue'
import ContainerOutlinedSvg from '../svg/outlined/container.svg'
import Icon, { IconProps } from '../components'

export type ContainerOutlinedProps = FunctionalComponent<IconProps>

export const ContainerOutlined: ContainerOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ContainerOutlinedSvg />
    </Icon>
  )
}
