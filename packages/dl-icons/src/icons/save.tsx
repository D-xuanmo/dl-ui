import { FunctionalComponent } from 'vue'
import SaveOutlinedSvg from '../svg/outlined/save.svg'
import Icon, { IconProps } from '../components'

export type SaveOutlinedProps = FunctionalComponent<IconProps>

export const SaveOutlined: SaveOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <SaveOutlinedSvg />
    </Icon>
  )
}
