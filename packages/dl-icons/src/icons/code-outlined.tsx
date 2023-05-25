import { FunctionalComponent } from 'vue'
import CodeOutlinedSvg from '../svg/outlined/code.svg'
import Icon, { IconProps } from '../components'

export type CodeOutlinedProps = FunctionalComponent<IconProps>

const CodeOutlined: CodeOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CodeOutlinedSvg />
    </Icon>
  )
}

export default CodeOutlined
