<!--
 * @Author: wenlin
 * @Date: 2020-02-21 14:22:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-10-19 15:42:24
 * @Description:  
 -->

<script lang="tsx">
import { Component, Vue, Provide } from 'vue-property-decorator'

import ProvideInject from './ProvideInject.vue'

@Component({
  // name: 'DemoTs',
  components: { ProvideInject }
})
export default class ProvideInjectParent extends Vue {
  name = '未初始化'

  // 直接注入变量。名字不变
  @Provide()
  number = 'No.1234'
  // 注入当前对象，在created中赋值,因为不是动态修改的，赋值无效。在constructor中进行赋值.但其后的属性不能监听。
  // 推荐使用$root或$parent来实现动态的当前对象绑定
  @Provide()
  rootMap: ProvideInjectParent
  // 注入方法，设置别名
  @Provide('getTokenProvide')
  getToken() {
    return 'token123456789'
  }

  constructor() {
    super()
    this.rootMap = this
  }

  created() {
    this.rootMap = this
    this.name = 'created'
  }

  render() {
    return (
      <div>
        <provideInject />
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
