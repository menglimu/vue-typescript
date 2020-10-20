/*
 * @Author: wenlin
 * @Date: 2020-05-22 17:55:53
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-22 09:44:05
 * @Description:
 * TDOO：引入vue文件可忽略后缀
 * TDOO：表格导入导出按钮
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import '@/styles/src/index.scss' // global css
// cui 公司内部ui框架，基于elementui
import cui from '@cci/cui'
Vue.use(cui)
// 公司elementui版本过低，需要使用其他的，按需引入
import { Image } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Image)

import '@/icons' // icon

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
