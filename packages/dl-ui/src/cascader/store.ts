import { computed, Ref, ref } from 'vue'
import { CascaderValue, CustomKeys, ICascaderOption, ROOT_PARENT } from '@xuanmo/dl-common'
import { cascaderOptionsToMap, createCascaderNameSpace } from './utils'
import { isEmpty, isObject, pickLastItem } from '@xuanmo/utils'

type SearchResultType = Array<{
  id: ICascaderOption['value']
  displayName: string
  path: ICascaderOption[]
}>

const [, searchPanelMatch] = createCascaderNameSpace('search-match')

export class CascaderStore {
  // 组件原始数据转换为 map 结构，方便后续调用
  optionMap: Map<ICascaderOption['value'], ICascaderOption> = new Map()

  // 当前选项的路径
  activePath: Ref<ICascaderOption[]> = ref([])

  // 当前选中的 tab
  activeTab: Ref<ICascaderOption['value']> = ref('')

  // 记录已加载过的 id 集合
  loadingCollect: Ref<Map<ICascaderOption['value'], boolean>> = ref(new Map())

  // 当前选择的数据
  value: CascaderValue

  // 自定义数据别名
  keys: CustomKeys

  // 搜索关键字
  searchKeywords = ref('')

  // 已选临时数据占位前缀
  readonly temporaryPrefix = '__temporary__'

  // 组件原始选项
  private originalOptions: ICascaderOption[] = []

  temporaryCount = 0

  constructor(
    value: CascaderValue,
    cascaderOptions: ICascaderOption[],
    options: {
      keys: CustomKeys
    }
  ) {
    this.value = value
    this.keys = options.keys
    this.updateByOptions(cascaderOptions, value)
  }

  get labelKey() {
    return this.keys.label as 'label'
  }

  get valueKey() {
    return this.keys.value as 'value'
  }

  get childrenKey() {
    return this.keys.children as 'children'
  }

  /**
   * 当前选中的面板选项列表
   */
  activeOptions = computed(() => {
    const activePath = this.activePath.value
    const lastOption = pickLastItem(activePath)
    const index = activePath.length - 2 < 0 ? 0 : activePath.length - 2
    if (isEmpty(activePath) || lastOption.__level === 1) return this.originalOptions
    if (this.isTemporary(lastOption[this.valueKey])) {
      return this.getOption(activePath[activePath.length - 2][this.valueKey])![this.childrenKey]
    }
    return this.getOption(activePath[index][this.valueKey])![this.childrenKey]
  })

  /**
   * 搜索结果
   */
  searchResult = computed<SearchResultType>(() => {
    if (!this.searchKeywords.value) return []
    const result: SearchResultType = []
    this.optionMap.forEach((item) => {
      if (item[this.labelKey].includes(this.searchKeywords.value)) {
        const value = item[this.valueKey]
        const { path, displayNames } = this.getPathByParentId(value, [], [], value)
        result.push({
          id: value,
          path,
          displayName: displayNames.join('/')
        })
      }
    })
    return result
  })

  /**
   * 通过父级 id 查找路径
   * @param parentId
   * @param path
   * @param displayNames
   * @param initial
   */
  getPathByParentId = (
    parentId: ICascaderOption['value'],
    path: ICascaderOption[],
    displayNames: string[],
    initial: ICascaderOption['value'] = ''
  ): {
    path: ICascaderOption[]
    displayNames: string[]
  } => {
    if (parentId === ROOT_PARENT) return { path, displayNames }
    const parent = this.optionMap.get(parentId)!
    if (parent[this.valueKey] === initial) {
      displayNames.unshift(
        parent[this.labelKey].replace(new RegExp(this.searchKeywords.value, 'g'), (match) => {
          return `<span class='${searchPanelMatch()}'>${match}</span>`
        })
      )
    } else {
      displayNames.unshift(parent[this.labelKey])
    }
    path.unshift(parent)
    return this.getPathByParentId(parent.__parent!, path, displayNames)
  }

  getOption = (id: ICascaderOption['value']) => this.optionMap.get(id)

  getTemporaryOption() {
    this.temporaryCount++
    const value = `${this.temporaryPrefix}@${this.temporaryCount}`
    return {
      value,
      option: {
        [this.valueKey]: value,
        [this.labelKey]: '请选择'
      }
    }
  }

  isTemporary = (id: ICascaderOption['value']) => {
    return `${id}`.includes(this.temporaryPrefix)
  }

  lastIsTemporary = () => this.isTemporary(this.activeTab.value)

  /**
   * 当前选择的数据用于回显的 label
   */
  getDisplayLabel = () => {
    return this.activePath.value
      .filter((item) => !this.isTemporary(item[this.valueKey]))
      .reduce<string[]>((prev, current) => {
        return [...prev, current[this.labelKey]]
      }, [])
      .join('/')
  }

  /**
   * 通过 value 更新路径等信息
   * @param value
   */
  updateByValue = (value: CascaderValue) => {
    this.value = value
    if (isEmpty(value) || isEmpty(this.optionMap)) {
      const { option, value } = this.getTemporaryOption()
      this.activePath.value = [{ ...option, __level: 1 }]
      this.activeTab.value = value
      return
    }
    const activePath: ICascaderOption[] = []
    value.forEach((item) => {
      const option = this.getOption(
        isObject(item) ? (item as ICascaderOption)[this.valueKey] : (item as string)
      )
      activePath.push(option!)
    })
    this.activePath.value = activePath
    this.activeTab.value = pickLastItem(activePath)[this.valueKey]
  }

  /**
   * 更新选项数据
   * @param options
   * @param value
   */
  updateByOptions = (options: ICascaderOption[], value = this.value) => {
    this.originalOptions = options
    this.optionMap = cascaderOptionsToMap(options, this.keys)
    this.updateByValue(value)
  }

  pushPath = (option: ICascaderOption) => {
    this.activePath.value.push(option)
  }

  updatePath = (options: ICascaderOption[]) => {
    this.activePath.value = options
    this.updateActiveTab()
  }

  replaceLastPath = (option: ICascaderOption) => {
    this.activePath.value.splice(this.activePath.value.length - 1, 1, option)
    this.updateActiveTab()
  }

  getLathPath = () => {
    return this.activePath.value[this.activePath.value.length - 1]
  }

  updateActiveTab = (value?: ICascaderOption['value']) => {
    this.activeTab.value = value || pickLastItem(this.activePath.value)[this.valueKey]
  }

  getValue = () => {
    return this.activePath.value
      .filter((item) => !`${item[this.valueKey]}`.includes(this.temporaryPrefix))
      .map((item) => {
        return isObject(item[this.valueKey])
          ? { [this.labelKey]: item[this.labelKey], [this.valueKey]: item[this.valueKey] }
          : item[this.valueKey]
      })
  }

  updateLoading = (value: ICascaderOption['value'], status: boolean) => {
    this.loadingCollect.value.set(value, status)
  }

  getLoading = (value: ICascaderOption['value']) => this.loadingCollect.value.get(value)

  updateSearch = (value: string) => {
    this.searchKeywords.value = value
  }
}
