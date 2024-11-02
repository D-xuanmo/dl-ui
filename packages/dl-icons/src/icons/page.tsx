import { FunctionalComponent } from 'vue'
import PageOutlinedSvg from '../svg/outlined/page.svg'
import Icon, { IconProps } from '../components'

export type PageOutlinedProps = FunctionalComponent<IconProps>

export const PageOutlined: PageOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <PageOutlinedSvg />
    </Icon>
  )
}
