/*
 * @Author: wenlin
 * @Date: 2020-02-25 10:25:33
 * @LastEditors: wenlin
 * @LastEditTime: 2020-08-07 16:48:30
 * @Description:  只保留form中的公共方法
 */
import { parseTime } from '@/utils'
import { MlTableColumn, MlFormColumn, MlTableConfig, MlFormConfig } from 'types'
import { CreateElement } from 'vue/types/umd'

// 获取树形的值
function getTreeVal(
  id: string | number,
  items: any[],
  optionLabel = 'label',
  optionValue = 'value',
  optionChildren = 'children'
): string {
  let result
  for (const i in items) {
    const item = items[i]
    if (item[optionValue] === id) {
      result = item[optionLabel]
      break
    } else if (item.children) {
      result = getTreeVal(id, item[optionChildren], optionLabel, optionValue, optionChildren)
    }
  }
  return result
}

// 转换表单的值，进行回显，表格以及viewform中有用
/**
 * @description: 将存的值转换为文本
 * @param {cellValue} 待转换的值
 * @param {config} 当前column的配置
 * @return: 转换后的文本，可能含有标签的字符串
 */
export function formatterFormValue<D>(
  cellValue: string | number | Array<string | number>,
  config: MlTableColumn<D>
): string | number {
  if (
    !['checkbox', 'select', 'radio', 'cascader', 'datetime', 'tree', 'selectTree'].includes(config.type) &&
    !Array.isArray(cellValue)
  ) {
    return cellValue
  }
  const valueArr: Array<string | number> = Array.isArray(cellValue) ? cellValue : [cellValue]
  if (['checkbox', 'select', 'radio'].includes(config.type) && Array.isArray(config.options)) {
    const value: string[] = []
    config.options
      .filter(
        obj =>
          valueArr.filter(val => (config.optionValue ? obj[config.optionValue] === val : val === obj.value)).length > 0
      )
      .forEach(obj => {
        config.optionLabel ? value.push(obj[config.optionLabel]) : value.push(obj.label)
      })
    return value.join(',')
  }
  if (config.type === 'cascader') {
    let ary = config.options || []
    let val = null
    let obj = null
    for (let i = 0; i < valueArr.length; i++) {
      const id = valueArr[i]
      obj = ary.find(obj => obj[config.optionValue || 'value'] === id)
      if (obj) {
        val = obj[config.optionLabel || 'label']
        ary = obj[config.optionChildren || 'children'] || []
      } else {
        val = ''
      }
    }
    return val
  }
  if (config.type === 'datetime' && typeof cellValue === 'number') {
    return parseTime(cellValue)
  }
  if (['tree', 'selectTree'].includes(config.type) && Array.isArray(config.options)) {
    if (Array.isArray(cellValue)) {
      cellValue.map(id =>
        getTreeVal(
          id,
          config.options || [],
          config.optionLabel || 'label',
          config.optionValue || 'value',
          config.optionChildren || 'children'
        )
      )
    } else {
      return getTreeVal(
        cellValue,
        config.options || [],
        config.optionLabel || 'label',
        config.optionValue || 'value',
        config.optionChildren || 'children'
      )
    }
  }
  if (Array.isArray(cellValue)) {
    return cellValue.join(',')
  }
  return cellValue
}

interface getOptionLabel<D> {
  (option: any, config: MlFormColumn<D>): string
}
interface getOptionValue<D> {
  (option: any, config: MlFormColumn<D>): string
}

export const getOptionLabel = function<D>(option: any, config: MlFormColumn<D>): string {
  return config.optionLabel ? option[config.optionLabel] : option.label
}

export const getOptionValue = function<D>(option: any, config: MlFormColumn<D>): string {
  return config.optionValue ? option[config.optionValue] : option.value
}

/**
 * @description: 获取各类型的默认render来自定义表格显示内容
 * @param {column} 配置项
 * @return:
 */

interface RowParams<D> {
  row: any
  column: MlTableColumn<D>
}

export function getBaseRender<D>(column: MlTableColumn<D>) {
  if (column.type === 'upload' || column.type === 'image') {
    return (h: CreateElement, params: RowParams<D>) => {
      let preList = params.row[column.prop]
      if (preList) {
        if (!Array.isArray(preList)) {
          preList = [preList]
        }

        if (column.baseUrl) {
          preList = preList.map((url: string) => column.baseUrl + url)
        }
        return preList.map((item: string) => {
          if (column.noPre) {
            return <img class="td-img" src={item} />
          } else {
            return <el-image class="td-img" fit="cover" src={item} preview-src-list={preList} />
          }
        })
      } else {
        return ''
      }
    }
  } else if (column.type === 'svg') {
    return (h: CreateElement, params: RowParams<D>) => {
      if (params.row[column.prop]) {
        return <svg-icon icon-class={params.row[column.prop]} />
      } else {
        return ''
      }
    }
  } else {
    return (h: CreateElement, params: RowParams<D>) => 
      (<div class="render-text" domPropsInnerHTML={formatterFormValue(params.row[column.prop], params.column)}></div>)
    
  }
}
