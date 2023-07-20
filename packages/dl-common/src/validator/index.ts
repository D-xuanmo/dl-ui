import { validator } from '@xuanmo/validator'
import zhCN from '@xuanmo/validator/locale/zh-CN.json'

// 默认注册中文
validator.localize(zhCN)

export * from '@xuanmo/validator'
export { validator }
