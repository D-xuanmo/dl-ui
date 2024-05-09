import { Component, render, createVNode } from 'vue'

export function mountComponent(RootComponent: Component) {
  const root = document.createElement('div')
  const instance = createVNode(RootComponent)
  render(instance, root)
  document.body.appendChild(root)

  return {
    instance: instance.component?.exposed,
    unmount: () => {
      render(null, root)
      document.body.contains(root) && document.body.removeChild(root)
    }
  }
}
