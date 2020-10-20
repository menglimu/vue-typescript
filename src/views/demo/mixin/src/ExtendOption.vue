<!--
 * @Author: wenlin
 * @Date: 2020-09-02 16:52:43
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-28 17:19:20
 * @Description:  extends 扩展
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'

@Component({
  name: 'ExtendParent',
  components: {}
})
class ExtendParent extends Vue {
  name = 'parent'
  created() {
    console.log('extends:parent：', this.name)
  }
  renderName() {
    return <div>{this.name}</div>
  }
}

@Component({
  name: 'ExtendOption',
  // extends: ExtendParent,
  components: {}
})
export default class ExtendOption extends ExtendParent {
  //
  name = 'children'
  created() {
    console.log('extends:children：', this.name)
  }
  render() {
    return this.renderName()
  }
}
</script>
<style lang="scss" scoped></style>
