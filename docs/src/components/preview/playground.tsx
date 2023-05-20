import { FunctionalComponent } from 'vue'
import { PLAYGROUND_SHORT_URL } from '@doc/constants'
import { createBEM } from './utils'

type PlaygroundProps = {
  playgroundKey: string
}

const Playground: FunctionalComponent<PlaygroundProps> = (props) => {
  const { playgroundKey } = props
  return (
    <div class={createBEM('playground')}>
      <iframe src={`${PLAYGROUND_SHORT_URL}${playgroundKey}`} />
    </div>
  )
}

export default Playground
