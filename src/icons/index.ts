/*
 * @Author: wenlin
 * @Date: 2020-02-25 09:59:40
 * @LastEditors: wenlin
 * @LastEditTime: 2020-06-15 15:28:39
 * @Description:
 */
import Vue from 'vue'
import SvgIcon from '@cci/cp-svg-icon' // svg组件
// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)

const re = /[^-]+/g
const icons = requireAll(req).map((i: any) => {
  return i.default.id.match(re)[1]
})

export default icons
// import Vue from 'vue'
// import SvgIcon from '@cci/cp-svg-icon' // svg组件
// // register globally
// Vue.component('svg-icon', SvgIcon)

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./svg', false, /\.svg$/)
// console.log(req);
// const re = /[^-]+/g
// const icons = requireAll(req).map(i => {
//   return i.match(/[^/img]([^.]*)/g)[0]
// })

// export default icons
