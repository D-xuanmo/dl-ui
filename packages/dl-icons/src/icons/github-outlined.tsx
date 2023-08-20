import { FunctionalComponent } from 'vue'
import GithubOutlinedSvg from '../svg/outlined/github.svg'
import Icon, { IconProps } from '../components'

export type GithubOutlinedProps = FunctionalComponent<IconProps>

const GithubOutlined: GithubOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <GithubOutlinedSvg />
    </Icon>
  )
}

export default GithubOutlined
