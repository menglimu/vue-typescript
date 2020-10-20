<!--
 * @Author: wenlin
 * @Date: 2020-05-22 17:58:48
 * @LastEditors: wenlin
 * @LastEditTime: 2020-06-12 15:05:31
 * @Description:  
-->
<template>
  <div class="layout">
    <div class="siderbar">
      <siderbar />
    </div>
    <div class="container">
      <div class="header">
        <header />
      </div>
      <div class="container-mid">
        <router-view class="container-page" />
      </div>
    </div>
  </div>
</template>

<script>
import Siderbar from './Sidebar'
import Header from './Header'

export default {
  name: 'Layout',
  components: {
    Siderbar,
    Header
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  .siderbar {
    flex: none;
    height: 100%;
    background: #001b31;
    box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.15);
  }
  .container {
    flex: auto;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    overflow-x: hidden;
    background: #f5f7f9;
    // padding: 0 20px 20px 20px;
    .header {
      flex: none;
      height: 60px;
      padding-left: 25px;
    }
    &-mid {
      flex: 1;
      background: #ffffff;
      border-radius: 6px;
      // padding: 20px;
      .container-page {
        padding: 20px;
      }
    }
  }
}
</style>
