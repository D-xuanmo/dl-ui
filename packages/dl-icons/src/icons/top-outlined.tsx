import { FunctionalComponent } from 'vue'
import TopOutlinedSvg from '../svg/outlined/top.svg'
import Icon, { IconProps } from '../components'

export type TopOutlinedProps = FunctionalComponent<IconProps>

const TopOutlined: TopOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <TopOutlinedSvg />
    </Icon>
  )
}

export default TopOutlined
