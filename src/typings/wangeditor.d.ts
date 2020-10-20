/*
 * @Author: wenlin
 * @Date: 2020-07-29 15:55:00
 * @LastEditors: wenlin
 * @LastEditTime: 2020-08-03 16:25:17
 * @Description:
 */

declare module 'wangeditor' {
  export type menus =
    | 'head'
    | 'bold'
    | 'fontSize'
    | 'fontName'
    | 'italic'
    | 'underline'
    | 'strikeThrough'
    | 'foreColor'
    | 'backColor'
    | 'link'
    | 'list'
    | 'justify'
    | 'quote'
    | 'emoticon'
    | 'image'
    | 'table'
    | 'video'
    | 'code'
    | 'undo'
    | 'redo'

  export interface emotion {
    title: string
    type: 'image' | 'emoji'
    content: { alt: string; src: string }[]
  }

  export interface selection {
    getSelectionText(): string
    getSelectionContainerElem(): Element[]
    getSelectionStartElem(): Element[]
    getSelectionEndElem(): Element[]
    collapseRange(): any
  }

  export interface uploadImgHooks {
    // 图片上传之前触发
    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，files 是选择的图片文件

    // 如果返回的结果是  则表示用户放弃上传
    // return {
    //     prevent: true,
    //     msg: '放弃上传'
    // }
    before?(xhr: XMLHttpRequest, editor: WangEditor, files: File): { prevent: true; msg: 'xxxx' }
    // 图片上传并返回结果，图片插入成功之后触发
    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务器端返回的结果
    success?(xhr: XMLHttpRequest, editor: WangEditor, result: any): void
    // 图片上传并返回结果，但图片插入错误时触发
    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象，result 是服务器端返回的结果
    fail?(xhr: XMLHttpRequest, editor: WangEditor, result: any): void
    // 图片上传出错时触发
    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
    error?(xhr: XMLHttpRequest, editor: WangEditor): void
    // 图片上传超时时触发
    // xhr 是 XMLHttpRequest 对象，editor 是编辑器对象
    timeout?(xhr: XMLHttpRequest, editor: WangEditor): void

    // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
    // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    // insertImg(url)
    // result 必须是一个 JSON 格式字符串！！！否则报错
    customInsert?(insertImg: { (url: string): void }, result: any, editor: WangEditor): void
  }

  export interface customConfig {
    menus?: menus[] // 菜单
    debug?: boolean
    onchange?(html: string): void
    onchangeTimeout?: number // onchange 触发的延迟时间
    zIndex?: number // 配置编辑区域的 z-index
    lang?: any // 多语言
    pasteFilterStyle?: boolean // 关闭粘贴样式的过滤
    pasteIgnoreImg?: boolean // 忽略粘贴内容中的图片
    pasteTextHandle?(content: string): string // 自定义处理粘贴的文本内容
    linkImgCallback?(url: string): void // 插入网络图片的回调
    linkCheck?(text: string, link: string): boolean // 插入链接的校验
    linkImgCheck?(src: string): boolean // 插入网络图片的校验
    onfocus?(): void
    onblur?(): void
    colors?: string[] // 配置字体颜色、背景色
    emotions?: emotion[] // 配置表情
    fontNames?: string[]
    uploadImgShowBase64?: boolean // 使用 base64 保存图片
    uploadImgServer?: string // 上传图片到服务器
    uploadImgMaxSize?: number // 限制图片大小
    uploadImgMaxLength?: number // 限制一次最多上传 5 张图片
    uploadImgParams?: any // 自定义上传参数
    uploadImgParamsWithUrl?: boolean // 将参数拼接到 url 中
    uploadFileName?: string // 上传图片时，可自定义filename
    uploadImgHeaders?: any // 上传图片时刻自定义设置 header
    withCredentials?: boolean // 跨域传递 cookie
    uploadImgTimeout?: number // 上传超时时间单位毫秒
    uploadImgHooks?: uploadImgHooks // 可使用监听函数在上传图片的不同阶段做相应处理
    customAlert?(info: string): void // 自定义提示方法
    customUploadImg?(files: File | FileList, insert: { (url: string): void }): void // 如果想完全自己控制图片上传的过程 需调用insert方法插入图片
    qiniu?: boolean // 允许上传到七牛云存储
    showLinkImg?: boolean // 隐藏“网络图片”tab
  }

  export interface txt {
    [key: string]: any
    txt(val?: string): string
    html(val?: string): string
    getJSON(): any
    clear(): void
    append(html: string): void
  }

  export default class WangEditor {
    id: string
    $textElem: Element[] // 获取编辑区域 DOM 节点
    $toolbarElem: Element[] // 获取菜单栏 DOM 节点
    config: any
    textElemId: string // 获取编辑区域 DOM 节点 ID
    toolbarElemId: string // 获取菜单栏 DOM 节点 ID
    imgMenuId: string // 获取菜单栏中“图片”菜单的 DOM 节点 ID
    selection: selection
    customConfig: customConfig
    txt: txt
    create(): void
    change(): void
    constructor(id: string)
  }
}
