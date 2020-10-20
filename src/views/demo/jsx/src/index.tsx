
import { Component, Vue, Prop } from 'vue-property-decorator'
import { createRandomId } from '@/utils'
import styles from './index.module.scss'
console.log(styles);
import { VNode } from 'vue/types/umd'

let preventReClick = {
  inserted(el: any, binding: any) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        // el.setAttribute('disabled', 'disabled')
        // console.dir(el)
        // console.log(binding.value)
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 5000)
      }
    })
  }
}

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

@Component({
  name: 'JsxDemo',
  components: { childrenSlot: Children },
  // 指令
  directives: {
    preventReClick
  }
})
export default class JsxDemo extends Vue {
  value = '我是输入值'
  showInfo = false
  onceDom:VNode = null

  created() {
    this.onceDom = <div>{this.value}</div>
  }

  onClick() {
    this.showInfo = !this.showInfo
  }
  nativeOnClick() {
    console.log('原生点击')
  }
  onClickOnce() {
    console.log('一次点击')
  }
  onChildrenMounted(e: string) {
    console.log(e)
  }
  protected render() {
    return (
      // dom 外的注释
      <div>
        {/* <span class={styles.item}  >十大电商</span>
        <div class={styles.aaa} >sadjflksdajlf<span class={styles.item}  >十大电商</span></div>
        <div class={styles.bbb} >sadjflksdajlf<span class={styles.item}  >十大电商</span> </div>
        <div>sadjflksdajlf<span class={styles.item}  >十大电商</span> </div> */}
        {/* dom内的注释 */}
        {/* 属性和prop直接写 */}
        {/* v-model */}
        <c-input class="aaa" v-model={this.value}></c-input>
        {/* v-show */}
        <div v-show={this.showInfo}>{this.value}</div>
        {/* v-if */}
        {this.showInfo && <div domPropsInnerHTML="v-html绑定"></div>}
        {/* v-for */}
        {new Array(5).fill('array').map(item => (
          <div>{item}</div>
        ))}
        {/* v-pre */}
        <div>{'{{ sdafsda }}'}</div>
        {/* v-once */}
        <div>{this.onceDom}</div>
        {/* 事件绑定 */}
        {/* 自定义指令 */}
        <c-button
          onClick={this.onClick}
          // vPreventReClick="5000"
          // v-preventReClick={5000}
          v-preventReClick={{ value: 5000, modifiers: true }}
          // v-preventReClick={createRandomId()} 这种写法有问题，修改disabled不生效
          // {...{ directives: [{ name: 'preventReClick', value: 1000 }] }}
        >
          显示隐藏
        </c-button>
        {/* slot-scope */}
        <childrenSlot
          name="scopedSlots"
          name1={'scopedSlots'}
          id="dom-id"
          attrs={{ id: 'dom-id' }}
          props={{ id: 'prop-id' }}
          on-children-mounted={this.onChildrenMounted}
          onChildren-mounted={this.onChildrenMounted}
          nativeOnClick={this.nativeOnClick}
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
      </div>
    )
  }
}