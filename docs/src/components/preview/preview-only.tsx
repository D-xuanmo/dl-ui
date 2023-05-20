import { FunctionalComponent } from 'vue'
import { createBEM } from './utils'

type PreviewOnlyProps = {
  code: any
}

const PreviewOnly: FunctionalComponent<PreviewOnlyProps> = (props) => {
  return <div class={createBEM('runtime')}>{props.code}</div>
}

export default PreviewOnly
