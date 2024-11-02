import { FunctionalComponent } from 'vue'
import PageAddOutlinedSvg from '../svg/outlined/page-add.svg'
import Icon, { IconProps } from '../components'

export type PageAddOutlinedProps = FunctionalComponent<IconProps>

export const PageAddOutlined: PageAddOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <PageAddOutlinedSvg />
    </Icon>
  )
}
