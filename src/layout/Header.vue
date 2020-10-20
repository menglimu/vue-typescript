<!--
 * @Author: wenlin
 * @Date: 2020-05-22 17:58:48
 * @LastEditors: wenlin
 * @LastEditTime: 2020-06-12 15:29:57
 * @Description:  
-->
<template>
  <div class="header">
    <!-- <span :title="isCollapse ? '展开' : '收起'">
      <svg-icon class="collapse" :class="{ isCollapse : isCollapse }" icon-class="collapse" @click.native="handleCollapse" />
    </span>-->
    <ul class="content">
      <li class="item">
        <svg-icon icon-class="avatar" class="avatar" />
        <span class="text">欢迎您</span>
      </li>
      <li class="item signout" @click="signout">
        <svg-icon icon-class="signout" class="avatar signout-avatar" />
        <span class="text signout-text">退出</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CHeader',
  computed: {},
  methods: {
    handleCollapse() {
      this.$store.commit('TOGGLE_MAIN_SIDER')
    },
    signout() {
      this.closeMethods()
    },
    closeMethods() {
      window.opener = null
      window.open('', '_self', '')
      window.close() // 以上三行可关闭单个页面
      window.open('', '_top')
      window.top.close()
      window.location.href = 'about:blank '
      window.close() // 上面两次关闭适用于FireFox等浏览器
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  > span {
    position: relative;
  }
  .collapse {
    position: absolute;
    top: 18px;
    left: -30px;
    cursor: pointer;
    &.isCollapse {
      transform: rotate(180deg);
    }
  }
  .content {
    float: right;
    .item {
      float: left;
      list-style: none;
      margin: 0 12px 0 28px;
      &.signout {
        cursor: pointer;
        margin-top: 3px;
      }
      &:hover {
        .text {
          color: #1ea1ff;
        }
      }
      .avatar {
        width: 32px;
        height: 36px;
        vertical-align: middle;
        &.signout-avatar {
          width: 20px;
          height: 22px;
        }
      }
      .text {
        font-size: 16px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #33485a;
        line-height: 24px;
        margin-left: 12px;
        &.signout-text {
          color: #677881;
        }
      }
    }
  }
}
</style>
