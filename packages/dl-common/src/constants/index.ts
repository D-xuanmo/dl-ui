export * from './prefix'
export * from './animation'
export const LABEL_WIDTH = '80px'

export const PRIMARY_COLOR = '#1890ff'
export const SUCCESS_COLOR = '#00B578'
export const WARNING_COLOR = '#FF8F1F'
export const ERROR_COLOR = '#FF3B30'

export const DEFAULT_REQUIRED_MARK_POSITION = 'left'

export const ROOT_PARENT = 'ROOT'

/** 水平对齐方式 */
export enum HorizontalAlignEnum {
  left = 'left',
  center = 'center',
  right = 'right'
}

/** 所有大小类型定义 */
export enum SizeEnum {
  small = 'small',
  medium = 'medium',
  large = 'large'
}

/** 弹框位置类型 */
export enum PlacementEnum {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
  center = 'center',
  custom = 'custom'
}

/** 主题类型 */
export enum ThemeEnum {
  primary = 'primary',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
  default = 'default',
  light = 'light'
}

/** 消息类型 */
export enum MessageThemeEnum {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error'
}

export enum ClientTypeEnum {
  PC = 'PC',
  MOBILE = 'MOBILE'
}

/**
 * 分隔符
 * 常用于多个值合并显示进行分割
 */
export const SEPARATOR = ','
