import { PickerColumnType, PICKER_PROPS } from './props'
import { DataType } from '../common'

type PickerType = {
  el: HTMLElement | null
  options: PickerColumnType[]
  itemHeight: number
  onChange?: (data: DataType) => void
}

class Picker {
  el: PickerType['el'] = null

  options: PickerType['options'] = []

  itemHeight = PICKER_PROPS.optionHeight.default

  /** 最大允许偏移距离 */
  maxTranslateY = 0

  /** 滚动容器选区信息 */
  clientRect: DOMRect | undefined = undefined

  startPageY = 0
  initTranslateY = 0

  onChange: PickerType['onChange'] | null = null

  constructor({ el, options, itemHeight, onChange }: PickerType) {
    this.el = el
    this.options = options
    this.itemHeight = itemHeight
    this.maxTranslateY = options.length * itemHeight + 10
    this.onChange = onChange
    this.initial()
  }

  /**
   * 初始化选择器
   */
  private initial = () => {
    this.el?.addEventListener(
      'touchstart',
      (event: TouchEvent) => this.touchStartHandler(event),
      false
    )
    this.el?.addEventListener(
      'touchmove',
      (event: TouchEvent) => this.touchMoveHandler(event),
      false
    )
    this.el?.addEventListener('touchend', (event: TouchEvent) => this.touchEndHandler(event), false)
  }

  private touchStartHandler(event: TouchEvent) {
    event.preventDefault()
    this.clientRect = this.el?.getBoundingClientRect()
    this.startPageY = event.touches[0].pageY
    this.initTranslateY = this.getTranslateY()
  }

  private touchMoveHandler(event: TouchEvent) {
    event.preventDefault()
    const pageY = event.touches[0].pageY
    const translateY = this.startPageY - pageY - this.initTranslateY
    this.el!.style.transition = '0s'
    this.translate(translateY)
  }

  private touchEndHandler(event: TouchEvent) {
    event.preventDefault()
    const currentIndex = this.calcCurrentIndex()
    const nextIndex = this.findNextItemByIndex(currentIndex)
    const currentOption = this.options[currentIndex]
    const index = currentOption?.disabled ? nextIndex : currentIndex
    this.el!.style.transition = '0.2s'
    this.translate(index * this.itemHeight)
    this.onChange?.(this.options[index])
  }

  private calcCurrentIndex() {
    const currentIndex = Math.round(Math.abs(this.getTranslateY() / this.itemHeight))
    return currentIndex >= this.options.length ? currentIndex - 1 : currentIndex
  }

  private getTranslateY() {
    return parseFloat(getComputedStyle(this.el!).transform.split(',').reverse()[0])
  }

  private translate(translateY: number) {
    const y = translateY > this.maxTranslateY ? this.maxTranslateY : translateY < 0 ? 0 : translateY
    this.el!.style.transform = `translate3d(0px, -${y}px, 0px)`
    this.el!.style.webkitTransform = `translate3d(0px, -${y}px, 0px)`
  }

  private findNextItemByIndex(index: number) {
    const options = this.options
    let nextIndex = 0
    for (let i = 0; i < options.length - 1; i++) {
      if (i <= index) continue
      if (!options[i].disabled) {
        nextIndex = i
        break
      }
    }
    return nextIndex
  }

  update({ options }: Pick<PickerType, 'options'>) {
    this.options = options
    this.maxTranslateY = options.length * this.itemHeight + 10
  }
}

export default Picker
