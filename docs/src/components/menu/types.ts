export type MenuItemType = {
  id: string
  content?: string
  path?: string
  groupTitle?: string
  groupId?: string
  hide?: boolean
  children?: MenuItemType[]
}
