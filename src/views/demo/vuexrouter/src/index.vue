<!--
 * @Author: wenlin
 * @Date: 2020-02-21 14:22:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-28 17:31:23
 * @Description:  
 -->

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

import { Route } from 'vue-router'
// 注册钩子。额外的钩子函数。注册后，才不会被放入methods中
Component.registerHooks(['beforeRouteLeave']) // 'beforeRouteEnter'

@Component
export default class DemoTs extends Vue {
  // 获取store中的属性
  get token() {
    return this.$store.state.token
  }
  // 获取store中的getter
  get getterToken() {
    return this.$store.getters.token
  }

  mounted() {
    // 触发store 中的 action
    setTimeout(() => this.$store.dispatch('setTokenAsync'), 10)
  }
  // 未注册，切换路由的时候，不会执行
  beforeRouteEnter(to: Route, from: Route, next: () => void) {
    console.log('beforeRouteEnter')
    next()
  }
  // 已注册，切换的时候，会执行
  beforeRouteLeave(to: Route, from: Route, next: () => void) {
    console.log('beforeRouteLeave')
    next()
  }

  render() {
    return (
      <div>
        <div>token: {this.token}</div>
        <div>getterToken: {this.getterToken}</div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
