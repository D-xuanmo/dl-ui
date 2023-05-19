import Tabs from './tabs.vue'
import TabPanel from './panel.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DTabs = withInstall(Tabs)
export const DTabPanel = withInstall(TabPanel)

export { type TabsProps, type TabPanelProps } from './props'

declare module 'vue' {
  export interface GlobalComponents {
    DTabs: typeof Tabs
    DTabPanel: typeof TabPanel
  }
}
