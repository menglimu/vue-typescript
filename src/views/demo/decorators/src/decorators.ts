/*
 * @Author: wenlin
 * @Date: 2020-09-02 10:21:51
 * @LastEditors: wenlin
 * @LastEditTime: 2020-09-28 16:56:15
 * @Description: 修饰器介绍demo
 */
// 类装饰器
function DecoratorsClass(constructor: any) {
  // 构造函数 作为唯一参数
  console.log('')
  console.log('%cDecoratorsClass--start', 'color:blue')
  console.log(constructor)
  console.log(new constructor())
  console.log('%cDecoratorsClass--end', 'color:red')
  console.log('')
}
// 方法装饰器
function DecoratorsGetNumber(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // 静态成员时，target为构造函数。实例成员时，target为原型对象
  console.log('')
  console.log('%cDecoratorsGetNumber--start', 'color:blue')
  console.log(target)
  console.log(descriptor)
  console.log('%cDecoratorsGetNumber--end', 'color:red')
  console.log('')

  descriptor.value = function() {
    return (this as TestDecoratorsClass).a * 10
  }
}
// 方法装饰器
function DecoratorsSetNumber(ratio: number) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = function(this: TestDecoratorsClass, a: number) {
      this.a = a * ratio
    }
  }
}
// 属性装饰器
function formatDate(target: any, propertyKey: string) {
  target[propertyKey] = new Date()
}

@DecoratorsClass
export default class TestDecoratorsClass {
  a: number

  @formatDate
  date: string | Date

  constructor() {
    this.a = 0
    // this.date = new Date()
  }
  @DecoratorsSetNumber(1000)
  setNumber(a: number) {
    this.a = a
  }

  @DecoratorsGetNumber
  getNumber() {
    return this.a
  }
}

const decorators = new TestDecoratorsClass()
decorators.setNumber(1)
console.log(decorators.a)
console.log(decorators.getNumber())
console.log(decorators.date)
console.log(decorators)
