import { Component } from 'vue'

export type TabsItemType = {
  label: string
  name: string
  component: Component
}

export type TabsValueType = string | number
