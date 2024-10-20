import { addUnit, createNamespace } from '../utils'
import { computed, CSSProperties, defineComponent } from 'vue'
import { useConfig, useModelValue } from '../hooks'
import { DIALOG_PROPS, DialogProps } from './props'
import { SetupContext } from 'vue'
import { DPopup } from '../popup'
import { ButtonProps, DButton } from '../button'
import { DSpace } from '../space'
import { CheckCircleFilled, CloseFilled, TipsFilled, WarningFilled } from '@xuanmo/dl-icons'
import { MessageThemeType } from '../common'
import { useCloseOnEsc } from '../hooks'
import { ClientTypeEnum } from '../constants'

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
    const config = useConfig(['clientType', 'closeOnEsc'], props)
    const isMobile = config.value.clientType === ClientTypeEnum.MOBILE
    const containerClass = computed(() =>
      [
        bem({
          'hide-overlay': !props.showOverlay,
          [config.value.clientType!.toLowerCase()]: true,
          'text-btn': props.textButton,
          [props.type]: true,
          ['no-footer']: !props.footer
        }),
        props.class
      ].join(' ')
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
      width: addUnit(props.width),
      height: addUnit(props.height)
    }))

    /* eslint-disable indent */
    const buttonProps = props.textButton
      ? ({
          fill: 'none',
          size: 'large'
        } as Partial<ButtonProps>)
      : undefined
    /* eslint-enable indent */

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
      closeOnEsc: config.value.closeOnEsc,
      closeFN: handleClose
    })

    const getIcon = () => {
      if (!props.showIcon) return null
      if (context.slots.icon) return context.slots.icon()
      const icons: Record<MessageThemeType, any> = {
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
          fill={isMobile ? 'solid' : 'outline'}
          theme={isMobile ? 'light' : undefined}
          disabled={props.loading}
          block={isMobile}
          {...buttonProps}
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
          block={isMobile}
          {...buttonProps}
          {...props.confirmButtonProps}
          onClick={handleConfirm}
        >
          {props.confirmButtonText}
        </DButton>
      )
      return (
        context.slots?.footer?.() || (
          <div class={footerClass}>
            {cancel}
            {confirm}
          </div>
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
        closable={isMobile ? false : props.closable}
        closeOnOverlayClick={props.closeOnOverlayClick}
        popupContainerClass={containerClass.value}
        popupClass={wrapperClass}
        popupHeaderClass={headerClass}
        popupBodyClass={bodyClass}
        popupStyle={props.noInlineStyle ? undefined : style.value}
        lockScroll={props.lockScroll}
        lazyRender={props.lazyRender}
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
