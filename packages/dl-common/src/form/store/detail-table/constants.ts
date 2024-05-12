/**
 * 明细表操作类型
 */
export enum DetailTableOperator {
  /**
   * 新增行
   */
  ADD = 'ADD',

  /**
   * 删除行
   */
  DELETE = 'DELETE',

  /**
   * 上移行
   */
  MOVE_UP = 'MOVE_UP',

  /**
   * 下移行
   */
  MOVE_DOWN = 'MOVE_DOWN',

  /**
   * 复制行
   */
  COPY = 'COPY'
}
