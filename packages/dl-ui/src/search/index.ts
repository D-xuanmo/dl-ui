import Search from './search.vue'
import { withInstall } from '@xuanmo/dl-common'

export const DSearch = withInstall(Search)

export { type SearchProps } from './props'

export default DSearch

declare module 'vue' {
  export interface GlobalComponents {
    DSearch: typeof Search
  }
}
