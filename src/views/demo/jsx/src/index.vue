<!--
 * @Author: wenlin
 * @Date: 2020-09-08 15:38:06
 * @LastEditors: wenlin
 * @LastEditTime: 2020-10-16 17:47:28
 * @Description:  jsx常用语法介绍
-->
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { createRandomId } from '@/utils'
import { VNode } from 'vue/types/umd'

@Component
class Children extends Vue {
  username = 'children'
  @Prop({ type: String, default: '' }) name: string
  @Prop({ type: String, default: '' }) id: string

  mounted() {
    this.$emit('children-mounted', 'mounted')
  }

  render() {
    return (
      <div>
        {/* 子组件注入 slot-scope */}
        <div>
          {this.name}：{this.$scopedSlots.username({ username: this.username })}
        </div>
        {/* 子组件注入 slot */}
        <div>{this.$slots.default}</div>
        <div>{this.$slots.bottom}</div>
        <div>propsId：{this.id}</div>
      </div>
    )
  }
}

@Component
class ChildrenCache extends Vue {
  mounted() {
    console.log('创建子组件')
  }

  render() {
    return <div>子组件缓存</div>
  }
}

@Component({
  name: 'JsxDemo',
  components: { childrenSlot: Children, ChildrenCache },
  // 指令
  directives: {
    preventReClick: {
      inserted(el: any, binding: any) {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = true
            // el.setAttribute('disabled', 'disabled')
            // console.dir(el)
            console.log(binding)
            setTimeout(() => {
              el.disabled = false
            }, binding.value || 5000)
          }
        })
      }
    },
    preventReObject: {
      inserted(el: any, binding: any) {
        el.addEventListener('click', () => {
          if (!el.disabled) {
            el.disabled = true
            // el.setAttribute('disabled', 'disabled')
            // console.dir(el)
            console.log(binding)
            setTimeout(() => {
              el.disabled = false
            }, binding.value.value || 5000)
          }
        })
      }
    }
  }
})
export default class JsxDemo extends Vue {
  value = '我是输入值'
  showInfo: boolean = null
  onceDom: VNode = null
  childrenList = [1, 2, 3]
  created() {
    this.showInfo = true
    this.onceDom = <div>{this.value}</div>
  }
  mounted() {
    console.log(this.$refs.childrenKeys)
  }

  onClick() {
    this.showInfo = !this.showInfo
  }
  nativeOnClick() {
    console.log('原生点击')
  }
  onClickOnce() {
    console.log('一次点击')
    this.childrenList = [1, 2, 4]
  }
  onChildrenMounted(e: string) {
    console.log(e)
  }
  protected render() {
    return (
      // dom 外的注释
      <div>
        {/* dom内的注释 */}

        <childrenSlot
          // {/* 属性和prop直接写 */}
          name="scopedSlots"
          name1={'scopedSlots'}
          id="dom-id"
          attrs={{ id: 'dom-id' }}
          props={{ id: 'prop-id' }}
          // {/* 事件绑定 */}
          on-children-mounted={this.onChildrenMounted}
          onChildren-mounted={(e: string) => this.onChildrenMounted(e + '-action')} // 直接在绑定的时候调用方法。比如循环的时候。传入当前item
          nativeOn-click={this.nativeOnClick} // 原生事件
          nativeOn={{ '~click': this.onClickOnce }}
          // {/* slot-scope */}
          scopedSlots={{
            default: () => <div></div>,
            username: (data: any) => {
              return <span>{data.username}</span>
            }
          }}>
          {/* slot */}
          <div>slot-default</div>
          <div slot="bottom">slot-bottom</div>
        </childrenSlot>

        {/* v-model */}
        <c-input class="aaa" v-model={this.value}></c-input>
        {/* v-show */}
        <div v-show={this.showInfo}>{this.value}</div>
        {/* v-if */}
        {this.showInfo && <div domPropsInnerHTML="v-html绑定"></div>}
        {/* v-for */}
        {new Array(5).fill('array').map((item, index) => (
          <div>{item + index}</div>
        ))}
        {/* v-pre */}
        <div>{'{{ sdafsda }}'}</div>
        {/* v-once */}
        <div>{this.onceDom}</div>
        {/* ref key */}
        {this.childrenList.map(key => (
          <ChildrenCache key={key} ref="childrenKeys" refInFor></ChildrenCache>
        ))}

        {/* 自定义指令 */}
        <c-button
          onClick={this.onClick}
          // 指令的写法
          vPreventReClick="2000"
          v-preventReClick={1000}
          v-preventReObject={{ value: 3000, modifiers: true }}
          // 第2种写法，将一个对象作为value传入。通过解析对象。来设置其中的修饰符
          {...{
            directives: [{ name: 'preventReClick', value: 1000 }]
          }}
          // {...{ directives: [{ name: 'preventReClick', value: 1000 }] }}
        >
          显示隐藏
        </c-button>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
