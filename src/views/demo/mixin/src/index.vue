<!--
 * @Author: wenlin
 * @Date: 2020-02-21 14:22:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-28 15:56:03
 * @Description:  vue的mixin和extend
 -->

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

import ExtendOption from './ExtendOption.vue'
import MixinOption from './MixinOption.vue'

@Component({
  components: { ExtendOption, MixinOption }
})
export default class MixinParent extends Vue {
  render() {
    return (
      <div>
        <ExtendOption />
        <MixinOption />
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
