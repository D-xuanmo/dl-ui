export type DetailTableRowData = {
  // 行数据 id
  rowId: string

  // 行数据真实下标
  dataIndex: number

  // 字段数据
  [key: string]: unknown
}
