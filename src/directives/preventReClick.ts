/*
 * @Author: wenlin
 * @Date: 2020-04-28 11:57:41
 * @LastEditors: wenlin
 * @LastEditTime: 2020-06-12 14:38:13
 * @Description:  防止重复点击指令
 */
export default {
  inserted(el: any, binding: any) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 500)
      }
    })
  }
}
