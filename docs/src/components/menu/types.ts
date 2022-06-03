export type MenuItemType = {
  id: string
  content?: string
  path?: string
  groupTitle?: string
  groupId?: string
  children?: MenuItemType[]
}
