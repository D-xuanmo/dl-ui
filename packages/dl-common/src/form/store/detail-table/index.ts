import { DetailTableRowData } from './types'
import { reactive } from 'vue'
import { deepCopy, throwError } from '@xuanmo/utils'
import { FormStore } from '../index'

export class DetailTableStore {
  formStore: FormStore

  constructor(formStore: FormStore) {
    this.formStore = formStore
  }

  /**
   * 所有明细表数据
   * key 为 IDetailTableItem.detailTableId
   */
  private tableData = reactive<Map<string, Map<string, DetailTableRowData>>>(new Map())

  /**
   * 是否为空表
   * @param tableId
   */
  public isEmptyTable(tableId: string): boolean {
    return (this.tableData.get(tableId)?.size ?? 0) === 0
  }

  /**
   * 批量更新明细表数据
   * @param tableId
   * @param tableData
   */
  public updateTableData(tableId: string, tableData: DetailTableRowData[]) {
    const oldTableData = this.getTableData(tableId)
    if (!oldTableData) {
      const map = new Map<string, DetailTableRowData>()
      tableData.forEach((data, index) => {
        map.set(data.rowId, { ...data, dataIndex: index })
      })
      this.tableData.set(tableId, map)
    } else {
      oldTableData.clear()
      tableData.forEach((data, index) => {
        oldTableData.set(data.rowId, { ...data, dataIndex: index })
      })
    }
  }

  /**
   * 获取明细表单个字段数据
   * @param tableId 明细表 id
   * @param rowId 明细行行 id
   * @param dataKey 数据 key
   */
  public getFieldValue(tableId: string, rowId: string, dataKey: string) {
    return this.getTableData(tableId)?.get(rowId)?.[dataKey]
  }

  /**
   * 明细表初始化时，创建空表数据
   * @param tableId
   */
  public createEmptyData(tableId: string) {
    this.tableData.set(tableId, new Map())
  }

  /**
   * 添加行数据
   * @param tableId 明细表 id
   * @param rowData 行数据
   */
  public addRow(tableId: string, rowData: DetailTableRowData | undefined) {
    const tableData = this.getTableData(tableId)
    const rowId = this.formStore.idGenerator()
    tableData?.set(rowId, {
      ...rowData,
      rowId,
      dataIndex: tableData.size + 1
    })
  }

  /**
   * 插入行
   * @param tableId 明细表 id
   * @param dataIndex 行号
   * @param rowData 行数据
   */
  public insertRow(tableId: string, dataIndex: number, rowData?: DetailTableRowData) {
    const tableData = this.getTableData(tableId)
    const convertedTableData = this.getTableData(tableId, true).toSpliced(
      dataIndex,
      0,
      rowData || ({ rowId: this.formStore.idGenerator() } as DetailTableRowData)
    )
    convertedTableData.forEach((data, index) => {
      tableData.set(data.rowId, { ...data, dataIndex: index })
    })
  }

  /**
   * 更新明细表行数据
   * @param tableId 明细表 id
   * @param rowId 行 id
   * @param value 当前组件数据
   * @param dataKey 当前组件 dataKey
   */
  public upsert(tableId: string, rowId: string, value: unknown, dataKey: string) {
    const tableData = this.getTableData(tableId)
    if (!tableData) return throwError('DetailTable', '未找到对应的明细表')
    const rowData = tableData.get(rowId)
    if (rowData) {
      tableData.set(rowId, {
        ...rowData,
        [dataKey]: value
      })
    } else {
      const rowId = this.formStore.idGenerator()
      tableData.set(rowId, {
        rowId,
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
  public deleteRow(tableId: string, rowId: string) {
    this.getTableData(tableId)?.delete(rowId)
  }

  /**
   * 复制行数据
   * @param tableId 明细表 id
   * @param rowId 行 id
   */
  public copyRow(tableId: string, rowId: string) {
    const rowData = this.getRowData(tableId, rowId)
    if (!rowData) return throwError('DetailTable', '未找到对应的明细行数据')
    this.addRow(tableId, deepCopy(rowData))
  }

  /**
   * 获取明细表行数据
   * @param tableId 明细表 id
   * @param rowId 行 id
   */
  public getRowData(tableId: string, rowId: string) {
    return this.getTableData(tableId)?.get(rowId)
  }

  /**
   * 获取明细表数据
   * @param tableId 明细表 id
   */
  public getTableData(tableId: string): Map<string, DetailTableRowData>
  public getTableData(tableId: string, convert: true): DetailTableRowData[]
  public getTableData(tableId: string, convert = false) {
    if (convert)
      return Array.from(this.tableData.get(tableId)?.values() ?? []).toSorted(
        (a, b) => a.dataIndex - b.dataIndex
      )
    return this.tableData.get(tableId)
  }

  /**
   * 获取转换后的明细表数据
   */
  public getTableDataConverted() {
    const data: Record<string, any[]> = {}
    Array.from(this.tableData.keys()).forEach((tableId) => {
      data[tableId] = this.getTableData(tableId, true)
    })
    return data
  }
}
