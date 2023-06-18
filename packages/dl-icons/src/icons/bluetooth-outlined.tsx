import { FunctionalComponent } from 'vue'
import BluetoothOutlinedSvg from '../svg/outlined/bluetooth.svg'
import Icon, { IconProps } from '../components'

export type BluetoothOutlinedProps = FunctionalComponent<IconProps>

const BluetoothOutlined: BluetoothOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <BluetoothOutlinedSvg />
    </Icon>
  )
}

export default BluetoothOutlined
