<!--
 * @Author: wenlin
 * @Date: 2020-02-21 14:22:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-27 17:55:59
 * @Description:  
 -->

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

import BaseOption from './BaseOption.vue'

@Component({
  // name: 'DemoTs',
  components: { BaseOption }
})
export default class BaseOptionParent extends Vue {
  number = ''

  mounted() {
    setTimeout(() => (this.number = 'NO.2'), 5000)
  }

  render() {
    return (
      <div>
        <baseOption number={this.number} />
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
