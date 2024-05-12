import { DetailTableRowData } from './types'
import { reactive, UnwrapNestedRefs } from 'vue'
import { createRandomID, deepCopy, throwError } from '@xuanmo/utils'
import { FormStore } from '../index'

export class DetailTableStore {
  /**
   * 所有明细表数据
   * key 为 IDetailTableItem.detailTableId
   */
  private tableData: Map<string, UnwrapNestedRefs<Map<string, DetailTableRowData>>> = new Map()

  private formStore: FormStore

  constructor(formStore: FormStore) {
    this.formStore = formStore
  }

  /**
   * 批量更新明细表数据
   * @param tableId
   * @param tableData
   */
  updateTableData(tableId: string, tableData: DetailTableRowData[]) {
    tableData.forEach((data) => {
      this.getTableData(tableId)?.set(data.id, data)
    })
  }

  /**
   * 获取明细表单个字段数据
   * @param tableId 明细表 id
   * @param dataKey 数据 key
   * @param rowId 明细行行 id
   */
  getFieldValue(tableId: string, dataKey: string, rowId: string) {
    return this.getTableData(tableId)?.get(rowId)?.[dataKey]
  }

  /**
   * 明细表初始化时，创建空表数据
   * @param tableId
   */
  createEmptyData(tableId: string) {
    this.tableData.set(tableId, reactive(new Map()))
  }

  /**
   * 添加行数据
   * @param rowData 行数据
   * @param tableId 明细表 id
   */
  addRow(rowData: DetailTableRowData, tableId: string) {
    const tableData = this.getTableData(tableId)
    const rowId = createRandomID()
    tableData?.set(rowId, {
      ...rowData,
      id: rowId,
      dataIndex: tableData.size + 1
    })
  }

  /**
   * 更新明细表行数据
   * @param value 当前组件数据
   * @param dataKey 当前组件 dataKey
   * @param tableId 明细表 id
   * @param rowId 行 id
   */
  upsert(value: unknown, dataKey: string, tableId: string, rowId: string) {
    const tableData = this.getTableData(tableId)
    if (!tableData) return throwError('DetailTable', '未找到对应的明细表')
    const rowData = tableData.get(rowId)
    if (rowData) {
      tableData.set(rowId, {
        ...rowData,
        [dataKey]: value
      })
    } else {
      const rowId = createRandomID()
      tableData.set(rowId, {
        id: rowId,
        dataIndex: tableData.size,
        [dataKey]: value
      })
    }
  }

  /**
   * 删除行数据
   * @param tableId 明细表 id
   * @param rowId 行 id
   */
  deleteRow(tableId: string, rowId: string) {
    this.getTableData(tableId)?.delete(rowId)
  }

  /**
   * 复制行数据
   * @param tableId 明细表 id
   * @param rowId 行 id
   */
  copyRow(tableId: string, rowId: string) {
    const rowData = this.getTableData(tableId)?.get(rowId)
    if (!rowData) return throwError('DetailTable', '未找到对应的明细行数据')
    this.addRow(deepCopy(rowData), tableId)
  }

  /**
   * 获取明细表数据
   * @param tableId
   */
  getTableData(tableId: string) {
    return this.tableData.get(tableId)
  }

  /**
   * 获取转换后的明细表数据
   */
  getTableDataConverted() {
    const data: Record<string, any[]> = {}
    Array.from(this.tableData.keys()).forEach((tableId) => {
      data[tableId] = Array.from(this.getTableData(tableId)?.values() ?? [])
    })
    return data
  }
}
