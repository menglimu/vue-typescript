<!--
 * @Author: wenlin
 * @Date: 2020-09-02 16:52:43
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-23 10:59:28
 * @Description:  mixin混入
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { mixins } from 'vue-class-component'

@Component({
  name: 'MixinParent',
  components: {}
})
class MixinParent extends Vue {
  name = 'parent'
  created() {
    console.log('parent：', this.name)
  }
  renderName() {
    return <div>{this.name}</div>
  }
}

@Component({
  name: 'MixinOption',
  // mixins: [MixinParent],
  components: {}
})
export default class MixinOption extends mixins(MixinParent) {
  //
  name = 'children'
  created() {
    console.log('children：', this.name)
  }
  render() {
    return this.renderName()
  }
}
</script>
<style lang="scss" scoped></style>
