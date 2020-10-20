/*
 * @Author: wenlin
 * @Date: 2020-05-22 17:55:53
 * @LastEditors: wenlin
 * @LastEditTime: 2020-10-14 10:04:37
 * @Description: 路由
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfigSingleView, RouteConfig, RouterOptions } from 'vue-router/types/router'

Vue.use(VueRouter)

export interface MlRouterConfig extends RouteConfigSingleView {
  hidden?: boolean
  icon?: string
  text?: string
  children?: MlRouterConfig[]
}

export const constantRouterMap: Array<MlRouterConfig> = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'decorators',
        path: '/demo/decorators',
        component: () => import('@/views/demo/decorators'),
        text: '修饰器',
        children: []
      },
      {
        name: 'base',
        path: '/demo/base',
        component: () => import('@/views/demo/base'),
        text: '基础属性操作',
        children: []
      },
      {
        name: 'jsx',
        path: '/demo/jsx',
        component: () => import('@/views/demo/jsx'),
        text: 'jsx常用操作',
        children: []
      },
      {
        name: 'provide-inject',
        path: '/demo/provideInject',
        component: () => import('@/views/demo/provideInject'),
        text: 'provideInject',
        children: []
      },
      {
        name: 'mixin-extend',
        path: '/demo/mixin',
        component: () => import('@/views/demo/mixin'),
        text: 'mixin',
        children: []
      },
      {
        name: 'vuex-router',
        path: '/demo/vuexrouter',
        component: () => import('@/views/demo/vuexrouter'),
        text: 'vuexrouter',
        children: []
      }
    ],
    hidden: true
  }
]

export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
