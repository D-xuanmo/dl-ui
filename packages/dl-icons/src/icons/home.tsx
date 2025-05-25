import { FunctionalComponent } from 'vue'
import HomeOutlinedSvg from '../svg/outlined/home.svg'
import Icon, { IconProps } from '../components'

export type HomeOutlinedProps = FunctionalComponent<IconProps>

export const HomeOutlined: HomeOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <HomeOutlinedSvg />
    </Icon>
  )
}
