<!--
 * @Author: wenlin
 * @Date: 2020-09-27 17:57:26
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-28 11:34:04
 * @Description:  ProvideInject 的使用方式
-->
<script lang="tsx">
import { Component, Vue, Inject } from 'vue-property-decorator'
import ProvideInjectParent from './index.vue'

@Component({
  name: 'ProvideInject',
  components: {}
})
export default class ProvideInject extends Vue {
  // 引入别名 Inject引入的东西，设置readonly
  @Inject('getTokenProvide')
  readonly getParentToken: { (): string }
  // 直接引入number变量
  @Inject()
  readonly number: string
  // 引入对象 并为其重新设置使用的变量名
  @Inject('rootMap')
  readonly rootMapParent: ProvideInjectParent

  token = ''

  mounted() {
    this.token = this.getParentToken()
    console.log(this.rootMapParent)
  }

  protected render() {
    return (
      <div>
        <div>{this.token}</div>
        <div>{this.number}</div>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
