import { FunctionalComponent } from 'vue'
import QrcodeOutlinedSvg from '../svg/outlined/qrcode.svg'
import Icon, { IconProps } from '../components'

export type QrcodeOutlinedProps = FunctionalComponent<IconProps>

const QrcodeOutlined: QrcodeOutlinedProps = (props) => {
  return (
    <Icon {...props}>
      <QrcodeOutlinedSvg />
    </Icon>
  )
}

export default QrcodeOutlined
