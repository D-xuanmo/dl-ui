import { App, Plugin } from 'vue'
import { toPascalCase } from '@xuanmo/javascript-utils'

export function withInstall<T>(options: T) {
  ;(options as Record<string, unknown>).install = (app: App) => {
    const { name } = options as unknown as { name: string }
    app.component(name, options)
    app.component(toPascalCase(name), options)
  }

  return options as T & Plugin
}
