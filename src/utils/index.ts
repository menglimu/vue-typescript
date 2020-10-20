/*
 * @Author: ??
 * @Date: 2019-11-08 09:59:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-07-29 10:37:52
 * @Description: 提供一些公用的基础方法
 * js-cookie：操作cookie的js库  https://www.npmjs.com/package/js-cookie
 * sockjs：websocket需后端同时使用   https://www.npmjs.com/package/sockjs-client
 */

export function parseTime(time: Date | number | string, format = 'yyyy-mm-dd hh:ii:ss') {
  if (!time) return ''
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    time = typeof time === 'string' ? parseInt(time) : time
    if (('' + time).length === 10) time = time * 1000
    date = new Date(time)
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/(y|m|d|h|i|s|a)+/gi, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time: any, option: any) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 数组去重
export function distinct(a: Array<any>, b: Array<any>, id: number) {
  const arr = a.concat(b)
  const arrId: Array<any> = []
  const result = []
  for (const i of arr) {
    if (arrId.length) {
      if (!arrId.includes(i[id])) {
        arrId.push(i[id])
        result.push(i)
      }
    } else {
      arrId.push(i[id])
      result.push(i)
    }
  }
  return result
}

/**
 * @description: 生成随机id
 * @return {String}
 */
export function createRandomId() {
  return (
    'id-' +
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    '-' +
    new Date().getTime() +
    '-' +
    Math.random()
      .toString()
      .substr(2, 5)
  )
}

/**
 * @description: 判断值是否为空,包括空[],{},'',不包括0
 * @param {any} str 所需判断的值
 * @return {Boolean} 是否为空
 */
export function isNull(str: any) {
  if (str === undefined || str === null || str === '') {
    return true
  } else if (Array.isArray(str) && str.length === 0) {
    return true
  } else if (typeof str === 'object' && Object.keys(str).length === 0) {
    return true
  }
  return false
}

/**
 * @description: 复制对象，深拷贝
 * @param {Object} obj 源对象
 * @return {Object} 克隆的对象
 */
export function copyObj<T>(obj: T): T {
  if (obj && typeof obj === 'object') {
    const objClone: any = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          // 正则对象和日期对象，直接进行复制
          if (obj[key] instanceof RegExp || obj[key] instanceof Date) {
            objClone[key] = obj[key]
          } else {
            objClone[key] = copyObj(obj[key])
          }
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
    return objClone
  } else {
    return obj
  }
}
