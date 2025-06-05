import { FunctionalComponent } from 'vue'
import ReferencesOutlinedSvg from '../svg/outlined/references.svg'
import Icon, { IconProps } from '../components'

export type ReferencesOutlinedProps = FunctionalComponent<IconProps>

export const ReferencesOutlined: ReferencesOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ReferencesOutlinedSvg />
    </Icon>
  )
}
