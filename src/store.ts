/*
 * @Author: wenlin
 * @Date: 2020-09-02 18:00:28
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-28 17:38:50
 * @Description: store数据
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  // ...
  state: {
    token: ''
  },
  getters: {
    token(state) {
      return state.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    setTokenAsync() {
      this.commit('setToken', 123)
      return Promise.resolve(123)
    }
  }
})
