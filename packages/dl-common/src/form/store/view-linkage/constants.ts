/**
 * 运算条件操作符
 */
export enum ExecuteSymbolEnum {
  /**
   * 相等
   */
  EQUAL = 'equal',

  /**
   * 不相等
   */
  NOT_EQUAL = 'not_equal',

  /**
   * 为空
   */
  NULL = 'null',

  /**
   * 不为空
   */
  NOT_NULL = 'not_null',

  /**
   * 包含
   */
  IN = 'in',

  /**
   * 不包含
   */
  NOT_IN = 'not_in'
}

/**
 * 执行结果运算符
 */
export enum ExecutePropEnum {
  /**
   * 编辑
   */
  EDIT = 'edit',

  /**
   * 显示
   */
  DISPLAY = 'display',

  /**
   * 隐藏
   */
  HIDE = 'hide',

  /**
   * 只读
   */
  READONLY = 'readonly',

  /**
   * 禁用
   */
  DISABLED = 'disabled',

  /**
   * 必填
   */
  REQUIRED = 'required'
}

/**
 * 条件运算
 */
export enum ConditionEnum {
  /**
   * 任一条件满足
   */
  ANY = 'any',

  /**
   * 所有条件满足
   */
  ALL = 'all'
}

/**
 * 关系类型
 */
export enum ConditionTypeEnum {
  /**
   * 常量
   */
  CONSTANT = 'constant',

  /**
   * 变量
   */
  VARIABLE = 'variable'
}
