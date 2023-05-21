import { FunctionalComponent } from 'vue'
import { DIcon, IconProps } from '@xuanmo/dl-icons'

type CodeOutlinedProps = FunctionalComponent<IconProps>

const CodeOutlined: CodeOutlinedProps = (props) => {
  return (
    <DIcon {...props}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <g transform="translate(3.000000, 6.000000)" stroke="currentColor" stroke-width="1.5">
            <polyline
              transform="translate(3.000000, 6.000000) scale(-1, 1) translate(-3.000000, -6.000000) "
              points="0 0 6 6 0 12"
            ></polyline>
            <polyline points="12 0 18 6 12 12"></polyline>
          </g>
        </g>
      </svg>
    </DIcon>
  )
}

export default CodeOutlined
