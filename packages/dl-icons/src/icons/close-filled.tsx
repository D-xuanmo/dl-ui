import { FunctionalComponent } from 'vue'
import CloseFilledSvg from '../svg/filled/close.svg'
import Icon, { IconProps } from '../components'

export type CloseFilledProps = FunctionalComponent<IconProps>

const CloseFilled: CloseFilledProps = (props) => {
  return (
    <Icon {...props}>
      <CloseFilledSvg />
    </Icon>
  )
}

export default CloseFilled
