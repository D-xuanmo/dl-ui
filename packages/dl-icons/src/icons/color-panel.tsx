import { FunctionalComponent } from 'vue'
import ColorPanelOutlinedSvg from '../svg/outlined/color-panel.svg'
import Icon, { IconProps } from '../components'

export type ColorPanelOutlinedProps = FunctionalComponent<IconProps>

export const ColorPanelOutlined: ColorPanelOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <ColorPanelOutlinedSvg />
    </Icon>
  )
}
