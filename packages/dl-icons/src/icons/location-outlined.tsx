import { FunctionalComponent } from 'vue'
import LocationOutlinedSvg from '../svg/outlined/location.svg'
import Icon, { IconProps } from '../components'

export type LocationOutlinedProps = FunctionalComponent<IconProps>

const LocationOutlined: LocationOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <LocationOutlinedSvg />
    </Icon>
  )
}

export default LocationOutlined
