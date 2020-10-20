/*
 * @Author: wenlin
 * @Date: 2020-06-02 10:50:23
 * @LastEditors: wenlin
 * @LastEditTime: 2020-08-03 15:38:43
 * @Description:
 */
interface AnyObj {
  [key: string]: any
}
declare module '@cci/cui'
declare module '@cci/cp-svg-icon'
// declare module 'AMap'
// declare let AMap: any
// {
//   export default class {

//   }

// }

// declare function merge<T>(...obj: any): T
declare module 'webpack-merge' {
  export default function merge<T>(...obj: any): T
}
