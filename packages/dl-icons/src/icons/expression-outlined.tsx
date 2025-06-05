import { FunctionalComponent } from 'vue'
import ExpressionOutlinedSvg from '../svg/outlined/expression.svg'
import Icon, { IconProps } from '../components'

export type ExpressionOutlinedProps = FunctionalComponent<IconProps>

export const ExpressionOutlined: ExpressionOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ExpressionOutlinedSvg />
    </Icon>
  )
}
