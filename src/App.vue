<!--
 * @Author: wenlin
 * @Date: 2020-05-22 17:18:43
 * @LastEditors: wenlin
 * @LastEditTime: 2020-07-06 16:13:23
 * @Description:  
-->
<template>
  <router-view id="app"></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// // decorators.js
// import { createDecorator } from 'vue-class-component'

// // Declare Log decorator.
// export const Log = createDecorator((options, key) => {
//   // Keep the original method for later.
//   const originalMethod = options.methods[key]
//   console.log(options,key);
//   // Wrap the method with the logging logic.
//   options.methods[key] = function wrapperMethod(...args) {
//     // Print a log.
//     console.log(`Invoked: ${key}(`, ...args, ')')

//     // Invoke the original method.
//     originalMethod.apply(this, args)
//   }
// })
// // Declare Log decorator.
// export const Prop = createDecorator((options, key) => {
//   options.props[key]
// })

@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  // // 初始数据可以直接声明为实例的属性
  // message: string = 'Hello!'
  // @Prop name: string;
  // components = []
  // mounted() {
  // }
  // @Log
  // // 组件方法也可以直接声明为实例的方法
  // onClick (): void {
  //   console.log(this);
  //   window.alert(this.message)
  // }
}
</script>

<style>
body {
  overflow: hidden;
}
</style>
