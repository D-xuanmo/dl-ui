import { withInstall } from '../utils'
import Layout from './layout'
import Header from './header'
import Sider from './sider'
import Content from './content'
import Footer from './footer'

export const DLayout = withInstall(Layout)
export const DLayoutHeader = withInstall(Header)
export const DLayoutSider = withInstall(Sider)
export const DLayoutContent = withInstall(Content)
export const DLayoutFooter = withInstall(Footer)

export { type LayoutSiderProps, type LayoutHeaderProps, type LayoutFooterProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    DLayout: typeof Layout
    DLayoutHeader: typeof Header
    DLayoutSider: typeof Sider
    DLayoutContent: typeof Content
    DLayoutFooter: typeof Footer
  }
}
