import { defineComponent, computed, CSSProperties, SetupContext } from 'vue'
import { addUnit, createNamespace } from '../utils'
import { DRAWER_PROPS, DrawerProps } from './props'
import DPopup from '../popup'
import { useModelValue } from '../hooks'
import DButton from '../button'
import DSpace from '../space'
import { useCloseOnEsc } from '../hooks'

const [name, bem] = createNamespace('drawer')

export default defineComponent({
  name,
  inheritAttrs: false,
  props: DRAWER_PROPS,
  emits: ['update:visible', 'confirm', 'close'],
  setup(props, context: SetupContext) {
    const containerClass = computed(() =>
      bem({
        'hide-overlay': !props.showOverlay,
        [props.placement]: props.placement
      })
    )
    const wrapperClass = bem('wrapper')
    const headerClass = bem('header')
    const titleClass = bem('title')
    const titleTextClass = bem('title-text')
    const bodyClass = bem('body')
    const footerClass = bem('footer')
    const cancelButtonClass = bem('cancel-button')
    const confirmButtonClass = bem('confirm-button')
    const [innerValue, setValue] = useModelValue<boolean, DrawerProps, 'visible'>(
      props,
      context.emit,
      'visible',
      'update:visible'
    )

    const style = computed<CSSProperties>(() => ({
      width: ['left', 'right'].includes(props.placement) ? addUnit(props.width) : undefined,
      height: ['top', 'bottom'].includes(props.placement) ? addUnit(props.height) : undefined
    }))

    const handleClose = () => {
      context.emit('close')
      setValue(false)
    }

    const handleConfirm = () => {
      const { onConfirm } = props
      if (onConfirm) {
        Promise.resolve(onConfirm()).then((result) => {
          if (result === false) return
          setValue(false)
        })
      } else {
        context.emit('confirm')
        setValue(false)
      }
    }

    useCloseOnEsc(innerValue, {
      type: 'drawer',
      closeOnEsc: props.closeOnEsc,
      closeFN: handleClose
    })

    const renderTitle = () => (
      <div class={titleClass}>
        <span class={titleTextClass}>{props.title}</span>
      </div>
    )

    const renderBody = () => {
      const content = context.slots.default?.() || props.content || null
      if (props.destroyOnClose) {
        return innerValue.value ? content : null
      }
      return content
    }

    const renderFooter = () => {
      if (!props.footer) return null
      if (Array.isArray(props.footer)) return props.footer
      const cancel = props.hideCancelButton ? null : (
        <DButton
          class={cancelButtonClass}
          fill="outline"
          disabled={props.loading}
          {...props.cancelButtonProps}
          onClick={handleClose}
        >
          {props.cancelButtonText}
        </DButton>
      )
      const confirm = props.hideConfirmButton ? null : (
        <DButton
          class={confirmButtonClass}
          theme="primary"
          loading={props.loading}
          {...props.confirmButtonProps}
          onClick={handleConfirm}
        >
          {props.confirmButtonText}
        </DButton>
      )
      return (
        context.slots?.footer?.() || (
          <DSpace class={footerClass} gap={8}>
            {confirm}
            {cancel}
          </DSpace>
        )
      )
    }

    return () => (
      <DPopup
        teleport={props.teleport}
        visible={innerValue.value}
        title={props.title}
        placement={props.placement}
        overlay={props.showOverlay}
        closable={props.closable}
        closeOnOverlayClick={props.closeOnOverlayClick}
        popupContainerClass={containerClass.value}
        popupClass={wrapperClass}
        popupHeaderClass={headerClass}
        popupBodyClass={bodyClass}
        popupStyle={style.value}
        lockScroll={props.lockScroll}
        onClose={handleClose}
      >
        {{
          title: renderTitle,
          default: renderBody,
          footer: renderFooter
        }}
      </DPopup>
    )
  }
})
