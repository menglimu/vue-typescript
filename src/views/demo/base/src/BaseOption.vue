<!--
 * @Author: wenlin
 * @Date: 2020-02-21 14:22:54
 * @LastEditors: wenlin
 * @LastEditTime: 2020-10-19 15:00:42
 * @Description:  
 -->

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  // name: 'BaseOptionName', // 不写该属性的话，会默认使用类名作为组件的name
  components: {}, // 组件在此处注入
  /*
   * 可以在此注入数据变量。用法不变。undefined值也能监听
   * 此处注入的变量不会被语法检测识别。编码时会提示未定义
   */
  data() {
    return { firstName: '赵' }
  }
})
export default class BaseOption extends Vue {
  // @Prop() number = 'NO.1' // prop默认值 错误写法
  @Prop({ type: String, default: 'NO.1' }) number: string

  lastName = '云'
  age: number // 初始值为undefined的字段。不会被注入vue的data中监听。如需设空的初始值，可设置为null
  otherInfo: { car: number } = null
  // data效果同前面的注入效果
  data() {
    return {
      firstName: '赵1'
    }
  }
  // data: 234 // data 与 vue-class-component中的注入钩子冲突

  // computed 使用方式
  get name() {
    return this.firstName + this.lastName
  }
  set name(value) {
    this.firstName = value.slice(0, 1)
    this.lastName = value.slice(1)
  }

  // watch 使用方式
  // @Watch('otherInfo')
  @Watch('otherInfo', { immediate: false, deep: false })
  onOtherInfoChange() {
    this.getCarInfo()
  }
  // 生命周期函数可直接写为类方法
  mounted() {
    console.log(this)
  }
  // methods 中的方法可以直接定义为类方法、vue会将所有钩子外的方法放入methods中
  getCarInfo() {
    console.log(`共有${this.otherInfo.car}辆车`)
  }
  onChangeData(key: string, value: any) {
    this[key] = value
  }

  render() {
    return (
      <div>
        <div>组件的name:{this.$options.name}</div>
        <br />
        <div>
          年龄：{this.age}
          <c-button onClick={() => this.onChangeData('age', 10)}>修改undefined值</c-button>
        </div>
        <div>
          姓名：{this.name}
          <c-button onClick={() => this.onChangeData('name', '卫子夫')}>修改computed</c-button>
        </div>
        <div>编号：{this.number}</div>
        <c-button onClick={() => this.onChangeData('otherInfo', { car: 3 })}>修改watch</c-button>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped></style>
