import { FunctionalComponent } from 'vue'
import GithubFilledSvg from '../svg/filled/github.svg'
import Icon, { IconProps } from '../components'

export type GithubFilledProps = FunctionalComponent<IconProps>

const GithubFilled: GithubFilledProps = (props) => {
  return (
    <Icon {...props}>
      <GithubFilledSvg />
    </Icon>
  )
}

export default GithubFilled
