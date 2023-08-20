import { FunctionalComponent } from 'vue'
import CodeSandboxOutlinedSvg from '../svg/outlined/code-sandbox.svg'
import Icon, { IconProps } from '../components'

export type CodeSandboxOutlinedProps = FunctionalComponent<IconProps>

const CodeSandboxOutlined: CodeSandboxOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <CodeSandboxOutlinedSvg />
    </Icon>
  )
}

export default CodeSandboxOutlined
