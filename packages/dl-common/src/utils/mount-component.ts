import { Component, render, createVNode } from 'vue'

export function mountComponent(
  RootComponent: Component,
  teleport: Element = document.createElement('div'),
  root: Element = document.body
) {
  const instance = createVNode(RootComponent, {
    teleport: teleport
  })
  render(instance, teleport)
  root.appendChild(teleport)

  return {
    instance: instance.component?.exposed,
    unmount: () => {
      render(null, teleport)
      root.contains(teleport) && root.removeChild(teleport)
    }
  }
}
