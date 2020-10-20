/*
 * @Author: jiachenpan
 * @Date: 2016-11-18 16:28:59
 * @LastEditors: wenlin
 * @LastEditTime: 2020-06-12 10:45:22
 * @Description: 一些常用的正则以及校验
 */

//  常用正则表达式
const REGS = {
  name: /^[\u4E00-\u9FA5]{2,4}$/, // 中文名
  phone: /^1[3-9]\d{9}$/, // 手机号
  mail: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, // 电子邮箱
  bankCode: /^([1-9]{1})(\d{15}|\d{18})$/, // 银行卡号
  idCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/, // 身份证
  number: /^[-]?\d+(\.\d+)?$/, // 数字
  url: /^(https?|http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
}

export default REGS

export function isvalidUsername(str: string): boolean {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval: string): boolean {
  return REGS.url.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str: string): boolean {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str: string): boolean {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str: string): boolean {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证字符串是否是正整数*/
export function validateNumber(str: string): boolean {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(str)
}

/* 验证密码至少 8 位，需包含数字、英文字母、特殊符号（~!@#$%^&*）*/
export function validateStrongPassword(str: string): boolean {
  const reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/
  return reg.test(str)
}

/* 验证字符串是否是邮箱 */
export function validateEmail(str: string): boolean {
  return REGS.mail.test(str)
}

/* 验证字符串是否是Json对象 */
export function validateIsJson(str: string): boolean {
  if (typeof str === 'string') {
    try {
      // str.replace(/\s*/g,"") 去除str中多余的空格（空白处）
      const obj = JSON.parse(str.replace(/\s*/g, ''))
      // eslint-disable-next-line
      if (typeof (obj) === "object" && Object.prototype.toString.call(obj) === "[object Object]") {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}
