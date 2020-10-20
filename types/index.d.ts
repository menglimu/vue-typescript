/*
 * @Author: wenlin
 * @Date: 2020-06-01 09:27:44
 * @LastEditors: wenlin
 * @LastEditTime: 2020-08-18 11:01:49
 * @Description:  配置的定义
 */
import { VNode, CreateElement, VNodeData } from 'vue/types/umd'
import Vue from 'vue'
import { ValidateCallback, ValidateFieldCallback } from 'element-ui/types/form'
import { ElTableColumn, TableColumnType } from 'element-ui/types/table-column'
import { ElTable } from 'element-ui/types/table'
interface AnyObj {
  [key: string]: any
}
export class MlForm extends Vue {
  /** 重置初始值 */
  reset(): void
  /** 验证数据 */
  validate(callback?: ValidateCallback): Promise<any>
  /** 验证单个数据 */
  validateField(props: string[] | string, callback?: ValidateFieldCallback): void
  /** 重置验证 */
  resetFields(): void
  /** 清除验证 */
  clearValidate(): void
}

export class MlTable<D = AnyObj, S = AnyObj> extends Vue {
  searchInput: S // 搜索表单值
  data: D[] // 表格数据
  loading: boolean // 是否加载遮罩
  pageSize: number // 分页大小
  currentPage: number // 分页页码
  total: number // 总输
  // sort = ''
  // sortType = ''
  multipleSelection: D[] // 选择的表格项

  // 刷新表格数据
  refresh(): void
  // 重置查询条件并搜索
  resetSearch(): void
  // 搜索
  search(type?: string): void
}
/** 表单的类型 */
export type MlFormType =
  | ''
  | 'special'
  | 'input'
  | 'string'
  | 'phone'
  | 'mail'
  | 'bankCode'
  | 'idCard'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'selectTree'
  | 'tree'
  | 'svg'
  | 'upload'
  | 'image'
  | 'date'
  | 'dates'
  | 'daterange'
  | 'time'
  | 'timerange'
  | 'datetime'
  | 'datetimerange'
  | 'color'
  | 'year'
  | 'cascader'
/** 转发所有属性为可选 */
type Partial<T> = {
  [P in keyof T]?: T[P]
}

interface MlColumnBase<O = AnyObj> {
  /** 表单或表格项的label名 */
  label: string
  /** 表单或表格项的数据key名 */
  prop: string
  /** 表单的类型，自定义的时候，传'' */
  type: MlFormType
  /** 下拉，单选多选等数据的选项 */
  options?: Array<O>
  /** 异步获取的数据选项函数 */
  optionsGet?(): Promise<{ content: O[] }>
  /** 下拉显示的名字key 默认label */
  optionLabel?: string
  /** 下拉取值得key 默认value */
  optionValue?: string
  /** 树形的children取值 默认children */
  optionChildren?: string
}
/** 具体可参考element中的form的校验 */
interface MlFormRule {
  message?: string
  trigger?: 'blur' | 'change'
  pattern?: RegExp
  type?: string
  required?: boolean
  min?: number
  max?: number
  validator?(rule: any, value: any, callback: { (error?: Error): void }): void
  asyncValidator?(rule: any, value: any, callback: { (error?: Error): void }): void
  // validator(value:any, rootValue?:any): boolean
}

/** 表单的具体项配置 */
interface MlFormColumn<D> extends MlColumnBase {
  /** 是否必填，默认为false */
  required?: boolean
  /** 默认值，初始化的时候，会有一次默认值计算，该项有值得时候，取该值 */
  value?: any
  /** 时候块级显示，独占一行，特殊的 edit。upload等会默认 true 其他默认 false */
  block?: boolean
  /** 输入框内的提示文本 */
  placeholder?: string
  /** label的长度，默认 100px */
  labelWidth?: string
  /** 每个输入项的长度，默认 33.33%， block默认100% */
  itemBoxWidth?: string
  /** 输入项内容的长度，默认100%，block的时候，不取该值 */
  itemWidth?: string
  /** 输入不符合时的提示 */
  error?: string
  /** 最小长度 */
  minlength?: number
  /** 最大长度 */
  maxlength?: number
  /** 值的正则校验表达式 */
  reg?: string | RegExp
  /** 输入值的校验规则，详细可以参考element */
  rules?: Array<MlFormRule>
  /** 是否展示，默认 true，可传方法，通过其他值或条件来控制 rootValue：根对象,*/
  show?: boolean | { (rootValue: D): boolean }

  /** 对输入的值进行格式化 */
  format?: {
    /** 自己的值格式化为组件的正常值 */
    toEleValue?(value: any, rootValue: D): any
    /** 组件的值转为自己的格式 */
    toValue?(value: any, rootValue: D): any
  }
  /** 标签名，不填会从组件内匹配，自定义标签的时候，使用 */
  tag?: string
  /** 其他扩展请参考element，nodeDate会通过渲染函数进行传值 https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1 */
  nodeData?: VNodeData
  /** 输入项的子对象 */
  children?: VNode[] | { (h: CreateElement): VNode[] }
  /** 自定义输入项的渲染 */
  render?(h: CreateElement): VNode
}

/** 表单的配置项 */
export interface MlFormConfig<D = AnyObj> {
  /** 表单的基础样式，默认default为下划线，round为圆角 */
  uiType?: 'default' | 'round'

  /** label的长度，默认 100px */
  labelWidth?: string

  /** label的对齐方式，下划线默认左对齐，圆角默认居中 */
  labelPosition?: 'left' | 'right' | 'center'

  /** 每个输入项的长度，默认 33.33%， block默认100% */
  itemBoxWidth?: string //输入项宽度

  /** 输入项内容的长度，默认100%，block的时候，不取该值 */
  itemWidth?: string

  /** 是否行内表单，默认 true */
  inline?: boolean

  /** 是否显示清除按钮，默认 true */
  clearable?: boolean

  /** 元素的size */
  size?: string

  /** 数据格式化函数 */
  format?: {
    /** 自己的值格式化为组件的正常值 */
    toEleValue?(value: any): D
    /** 组件的值转为自己的格式 */
    toValue?(value: D): any
  }

  /** 具体表单项的配置 */
  columns: Array<MlFormColumn<D>>
}
/** 重新element的单项配置，解决兼容性 */
interface ElTableColumnAny extends Partial<ElTableColumn> {
  type: any
  label: string
  prop: string
}
/** 重新自定义的项配置，解决兼容 */
interface MlColumnBaseAny extends MlColumnBase {
  type: any
}

/** 表格的具体项配置 */
interface MlTableColumn<D> extends ElTableColumnAny, MlColumnBaseAny {
  /** 表格中的类型包括 */
  type: MlFormType | TableColumnType

  /** 是否在表格中展示 */
  showTable?: true

  /** 搜索时使用，默认false */
  searchForm?: true

  /** 图片的时候，是否使用预览 */
  noPre?: boolean

  /** 图片的前缀路径 */
  baseUrl?: string

  /** 自定义表格内容的展示 */
  render?(
    h: CreateElement,
    params: {
      column: MlTableColumn<D>
      row: D
      index: number
    }
  ): VNode
}

interface TableParams {
  size?: number
  page?: number
  // [P in keyof S]?: S[P]
}

/** 表格配置 */
interface MlTableConfig<D, S> extends Partial<ElTable> {
  /** 多选，默认true */
  selection?: boolean

  /** 多选时候，分页，保存选择状态 */
  reserveSelection?: boolean

  /** 序号 默认false */
  index?: boolean

  /** 是否tree，属性表格，根据业务加上的 */
  tableTree?: boolean

  /** 主键，默认id */
  tableKey?: string

  /** 表格操作宽度 */
  tableOptWidth?: string

  /** 请求的接口列表 */
  api?: {
    /** 删除数据 */
    delete?(data: D[]): Promise<any>

    /** 查询列表数据 */
    list?(
      data: S & TableParams
    ): Promise<{
      totalElements: number
      content: D[]
    }>

    /** 树形数据查询 */
    tree?(
      data: S & TableParams
    ): Promise<{
      content: D[]
    }>

    /** TODO：导入数据 */
    import?(data: S & TableParams): Promise<any>

    /** TODO：导出数据 */
    export?(data: S & TableParams): Promise<any>
  }
  /** 初始化的时候，是否直接请求数据，默认 true */
  initSearch?: boolean

  /** 是否显示分页，默认 true */
  showPagination?: boolean

  /** 表格的具体项 */
  columns: Array<MlTableColumn<D>>
}

/** 表格内按钮配置 */
interface MlTableInnerBtn<D> {
  /** 触发的事件类型，在表格组件上使用@xxx来监听事件 */
  evtType: string

  /** 按钮内的文字 */
  name: string

  /** element所支持的图标，查看element内的文档 */
  Elicon?: string
  /** svg图标，参考svg-icon的实现 */
  icon?: string
  /** mlbutton中使用的 */
  uiType?: string
  /** mlbutton中使用的 */
  colorType?: string

  /** 可使用函数返回true/false，判断显示，参数为行数据，使用对象的时候，对象内的每个属性和行数据相等时可用 */
  showJudge?: AnyObj | { (data: D): boolean } //

  render?(h: CreateElement, scoped?: any): VNode
}

/** 表格外按钮配置 */
interface MlTableOuterBtn<D> extends MlTableInnerBtn<D> {
  selection?: 'none' | 'single' | 'multiple' | '' // false   不选,(其他值)， 单选，多选，
}

/** 回显每一项的配置 */
export interface MlViewColumn<D = AnyObj> extends MlTableColumn<D> {
  block?: boolean //独占一行
  itemBoxWidth?: string //输入项宽度
}

/** 回显的配置 */
export interface MlViewConfig {
  itemBoxWidth?: string
  columns: Array<MlViewColumn>
}

/** 表格的prop，方便把表格的prop放在一个对象里面进行处理 */
export interface MlTableProps<D = AnyObj, S = AnyObj> {
  /** 搜索和重置按钮在输入项后显示，！输入项不能占满元素 */
  searchBtnInForm?: boolean

  /** 表格配置项可通过columns中的searchForm,addForm,editForm,viewForm来控制下面的表单配置计算 */
  config: MlTableConfig<D, S>

  /** 搜索表单配置 */
  searchConfig?: MlFormConfig<D>

  /** 搜索表单附加值，会被输入框中的值覆盖 */
  searchData?: AnyObj

  /** 表格内按钮 */
  innerBtn?: MlTableInnerBtn<D>[]

  /** 表格外按钮 */
  outerBtn?: MlTableOuterBtn<D>[]

  /** 删除按钮,传入删除按钮的名字 */
  deleteBtn?: string
  /** 数据加载前的钩子函数，可处理请求参数，也可在api中的list方法中处理请求 */
  beforeGetList?: { (type: string, params: S & TableParams): AnyObj }
  /** 数据加载后的钩子函数 */
  afterGetList?: { (type: string, res: AnyObj): void }
}
export default class MlComponents {
  MlTable: MlTable
  MlForm: MlForm
  static install(vue: typeof Vue, options?: AnyObj): void
}
