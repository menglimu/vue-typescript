<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { RouterOptions, RouteConfig } from 'vue-router'
import { constantRouterMap, MlRouterConfig } from '@/router'
import { VNode } from 'vue/types/umd'
@Component({
  name: 'Sidebar',
  components: {}
})
export default class Sidebar extends Vue {
  handleMenuClick() {}
  onSelect() {
    // console.log("click", index, indexPath)
  }
  r(h: CreateElement, subMenu: MlRouterConfig): any {
    const children = subMenu.children
    if (children && children.length) {
      if (subMenu.hidden) {
        return children.map(item => {
          return this.r(h, item)
        })
      }
      return (
        <c-submenu index={subMenu.path} on-click={this.handleMenuClick.bind(this, subMenu)}>
          <template slot="title">
            {subMenu.icon && <svg-icon class="menu_icon" icon-class={subMenu.icon} />}
            <span>{subMenu.text}</span>
          </template>
          {children.map(item => {
            return this.r(h, item)
          })}
        </c-submenu>
      )
    } else {
      if (subMenu.hidden) {
        return
      }
      return (
        <c-menu-item index={subMenu.path} class="submenu-title-noDropdown">
          <template slot="title">
            {subMenu.icon && <svg-icon class="menu_icon" icon-class={subMenu.icon} />}
            <span>{subMenu.text}</span>
          </template>
        </c-menu-item>
      )
    }
  }

  render(h: CreateElement) {
    return (
      <div class="sidebar">
        <div class="sidebar-header">
          <router-link to="/complexcommand/maincommand">
            <svg-icon icon-class="logo" class="logo" />
          </router-link>
          <p class="sys-name">组件示例</p>
        </div>
        <c-menu
          router
          mode="vertical"
          unique-opened
          background-color="#001B31"
          text-color="#FFFFFF"
          active-text-color="#FFFFFF"
          default-active={this.$route.name}
          on-select={this.handleMenuClick}>
          {constantRouterMap.map(item => this.r(h, item))}
        </c-menu>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu {
  border-right: 0px;
}
.el-menu-item:hover,
.el-menu-item:focus,
.el-submenu__title:hover {
  outline: none;
  background: #33485a !important;
}
.el-submenu.is-active {
  >>> .el-submenu__title {
    background: #33485a !important;
  }
  >>> .el-menu.el-menu--inline {
    a:not(.router-link-active) {
      .el-menu-item {
        background: #33485a !important;
      }
    }
  }
}
.el-menu-item.is-active {
  background: #00a1ff !important;
  background: linear-gradient(270deg, rgba(0, 161, 255, 0) 0%, rgba(0, 161, 255, 1) 100%) !important;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background: #d9f0f7;
    height: 100%;
    width: 3px;
  }
}
.sidebar {
  width: 248px;
  position: relative;
  &.isCollapse {
    width: 64px;
  }
  .menu_icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 16px;
  }
  &-header {
    height: 136px;
    text-align: center;
    .logo {
      width: 48px;
      height: 48px;
      margin-top: 33px;
    }
    .sys-name {
      font-size: 18px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #fff;
    }
  }
  .collapse {
    position: absolute;
    top: 18px;
    right: -44px;
    cursor: pointer;
    &.isCollapse {
      transform: rotate(180deg);
    }
  }
}
</style>
