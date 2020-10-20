<!--
 * @Author: wenlin
 * @Date: 2020-06-12 15:34:42
 * @LastEditors: wenlin
 * @LastEditTime: 2020-07-06 16:22:29
 * @Description:  
-->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component({
  name: 'LayoutMenu',
  components: {}
})
export default class LayoutMenu extends Vue {
  protected render(h: CreateElement) {
    return <router-view></router-view>
  }
}
</script>
<style lang="scss" scoped></style>
