import { FunctionalComponent } from 'vue'
import FormOutlinedSvg from '../svg/outlined/form.svg'
import Icon, { IconProps } from '../components'

export type FormOutlinedProps = FunctionalComponent<IconProps>

export const FormOutlined: FormOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <FormOutlinedSvg />
    </Icon>
  )
}
