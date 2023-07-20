import { Component, createApp } from 'vue'

export function mountComponent(RootComponent: Component) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
    }
  }
}
