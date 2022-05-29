import { App } from 'vue'
import { FormGlobalConfigType, globalConfigKey } from '@/constants/context'
import { Example, ExampleBEM } from './example'
import Input from './input'
import Cell from './cell'
import CellGroup from './cell-group'
import './style/index.scss'

export default {
  install(app: App, options?: FormGlobalConfigType) {
    app.provide(globalConfigKey, {
      hideLabel: false,
      labelWidth: '80px',
      ...(options ?? {})
    })
    app.use(Example)
    app.use(ExampleBEM)
    app.use(Cell)
    app.use(CellGroup)
    app.use(Input)
  }
}
