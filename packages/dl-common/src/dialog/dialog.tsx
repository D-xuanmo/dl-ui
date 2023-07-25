import { addUnit, createNamespace } from '../utils'
import { computed, CSSProperties, defineComponent } from 'vue'
import { useModelValue } from '../hooks'
import { DIALOG_PROPS, DialogProps } from './props'
import { SetupContext } from 'vue'
import DPopup from '../popup'
import DButton from '../button'
import DSpace from '../space'
import { CheckCircleFilled, CloseFilled, TipsFilled, WarningFilled } from '@xuanmo/dl-icons'
import { MessageThemeEnum } from '../common'
import { useCloseOnEsc } from '../hooks/use-close-on-esc'

const [name, bem] = createNamespace('dialog')

export default defineComponent({
  name,
  components: {
    DPopup,
    DButton,
    DSpace,
    CheckCircleFilled,
    CloseFilled,
    TipsFilled,
    WarningFilled
  },
  props: DIALOG_PROPS,
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
    const titleIconClass = bem('title-icon')
    const titleTextClass = bem('title-text')
    const bodyClass = bem('body')
    const footerClass = bem('footer')
    const cancelButtonClass = bem('cancel-button')
    const confirmButtonClass = bem('confirm-button')
    const [innerValue, setValue] = useModelValue<boolean, DialogProps, 'visible'>(
      props,
      context.emit,
      'visible',
      'update:visible'
    )

    const style = computed<CSSProperties>(() => ({
      top: props.placement === 'center' ? '50%' : addUnit(props.top),
      width: addUnit(props.width),
      height: addUnit(props.height)
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
      type: 'dialog',
      closeOnEsc: props.closeOnEsc,
      closeFN: handleClose
    })

    const getIcon = () => {
      if (!props.showIcon) return null
      if (context.slots.icon) return context.slots.icon()
      const icons: Record<MessageThemeEnum, any> = {
        info: <TipsFilled className={titleIconClass} color="var(--d-primary)" />,
        success: <CheckCircleFilled className={titleIconClass} color="var(--d-success)" />,
        warning: <WarningFilled className={titleIconClass} color="var(--d-warning)" />,
        error: <CloseFilled className={titleIconClass} color="var(--d-error)" />
      }
      return icons[props.theme]
    }

    const renderTitle = () => (
      <div class={titleClass}>
        {getIcon()}
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
          <DSpace class={footerClass} justify="end" gap={8}>
            {cancel}
            {confirm}
          </DSpace>
        )
      )
    }

    return () => (
      <DPopup
        teleport={props.teleport}
        visible={innerValue.value}
        placement="custom"
        transitionPrefix={name}
        overlay={props.showOverlay}
        closable={props.closable}
        closeOnOverlayClick={props.closeOnOverlayClick}
        popupContainerClass={containerClass.value}
        popupClass={wrapperClass}
        popupHeaderClass={headerClass}
        popupBodyClass={bodyClass}
        popupStyle={style.value}
        onClose={handleClose}
      >
        {{
          default: renderBody,
          title: renderTitle,
          footer: renderFooter
        }}
      </DPopup>
    )
  }
})
