import { useSlots, h, VNode } from 'vue'

export const useContent = () => {
  const slots = useSlots()

  return (name: string, params: Record<string, any>) => {
    const node = slots[name] as unknown as VNode
    return node ? h(node, params) : null
  }
}
