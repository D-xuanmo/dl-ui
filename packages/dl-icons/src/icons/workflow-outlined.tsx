import { FunctionalComponent } from 'vue'
import WorkflowOutlinedSvg from '../svg/outlined/workflow.svg'
import Icon, { IconProps } from '../components'

export type WorkflowOutlinedProps = FunctionalComponent<IconProps>

export const WorkflowOutlined: WorkflowOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <WorkflowOutlinedSvg />
    </Icon>
  )
}
