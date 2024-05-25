import { Component, render, createVNode } from 'vue'
import { PREFIX } from '../constants'

export function mountComponent(
  RootComponent: Component,
  teleport: Element = document.createElement('div'),
  root: Element = document.body
) {
  const instance = createVNode(RootComponent, {
    teleport: teleport
  })
  teleport.classList.add(`${PREFIX}-teleport`)
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
