<!--
 * @Author: wenlin
 * @Date: 2020-02-21 14:22:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-28 17:10:22
 * @Description:  装饰器入口
 -->

<script lang="tsx">
import('./decorators')
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Decorators extends Vue {
  render() {
    return <div></div>
  }
}
</script>
<style lang="scss" scoped></style>
