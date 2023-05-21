import { Component, createApp } from 'vue'

export function mountComponent(RootComponent: Component, appendRoot = true) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  appendRoot && document.body.appendChild(root)

  return {
    instance: app.mount(root),
    unmount() {
      app.unmount()
      appendRoot && document.body.removeChild(root)
    }
  }
}
