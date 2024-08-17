import { FunctionalComponent } from 'vue'
import MosaicFilledSvg from '../svg/filled/mosaic.svg'
import Icon, { IconProps } from '../components'

export type MosaicFilledProps = FunctionalComponent<IconProps>

const MosaicFilled: MosaicFilledProps = (props) => {
  return (
    <Icon {...props}>
      <MosaicFilledSvg />
    </Icon>
  )
}

export default MosaicFilled
