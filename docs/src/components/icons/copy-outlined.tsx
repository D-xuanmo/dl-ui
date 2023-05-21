import { FunctionalComponent } from 'vue'
import { DIcon, IconProps } from '@xuanmo/dl-icons'

type CopyOutlinedProps = FunctionalComponent<IconProps>

const CopyOutlined: CopyOutlinedProps = (props) => {
  return (
    <DIcon {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
          <g
            transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) translate(4.000000, 4.000000)"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              d="M3.36842105,3.12909474 L3.36842105,1.18421053 C3.36842105,0.530189474 3.89861053,0 4.55263158,0 L14.8157895,0 C15.4698105,0 16,0.530189474 16,1.18421053 L16,11.4473684 C16,12.1013895 15.4698105,12.6315789 14.8157895,12.6315789 L12.8489684,12.6315789"
              stroke-linecap="round"
            ></path>
            <path d="M11.4473684,3.36842105 L1.18421053,3.36842105 C0.530189474,3.36842105 0,3.89861053 0,4.55263158 L0,14.8157895 C0,15.4698105 0.530189474,16 1.18421053,16 L11.4473684,16 C12.1013895,16 12.6315789,15.4698105 12.6315789,14.8157895 L12.6315789,4.55263158 C12.6315789,3.89861053 12.1013895,3.36842105 11.4473684,3.36842105 Z"></path>
          </g>
        </g>
      </svg>
    </DIcon>
  )
}

export default CopyOutlined
