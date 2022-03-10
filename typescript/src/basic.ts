/*
 * @Author: Lqf
 * @Date: 2021-10-21 19:35:00
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-27 13:43:55
 * @Description: 我添加了修改
 */

// 1. 基础类型
let str: string = 'Lqf'
let age: number = 22
let isOk: boolean = true
// 包装对象
let str1: String
str1 = new String('1')




// 2. 空和未定义
let a: null
let b: undefined
let c // any 类型
let d: number // 自动声明为undefined
// c.toFixed(1) // 不会报错，需设置strictNullChecks为true

let ele = document.querySelector('div')
// 设置strictNullChecks为true
if (ele) {
  ele.style.display = 'none'
}





// 3. 对象
let obj: Object = {}
let arr: Array<number> = [1, 2, 3]
let d1: Date = new Date()

// 不推荐
let user: Object = {
  x: 1,
  y: 2
}

let user1: {username: string, age: number} = {
  username: 'lqf',
  age: 20
}
user1.username = 'Lqf'






// 4. 接口--只是类型，不能当作具体值,运行后不存在于具体代码中
interface Person {
  username: string,
  age: number
}

let user2: Person = {
  username: 'Lqf',
  age: 22
}

// 5. 类
class Person {
  constructor(public username: string, public age: number) {

  }
}

let user3: Person = new Person('Lqf', 20)

// eg1
interface AjaxOptions {
  url: string;
  method: string;
}

function ajax(options: AjaxOptions) {}

ajax({
  url: '',
  method: 'get'
})





// 6. 数组
let arr1: Array<number> = [1, 2, 3]
let arr2: string[] = ['a', 'b', 'c']






// 7. 元组
let data1: [string, number] = ['Lqf', 1] // 初始化时数据必须一一对应，后续可自由添加





// 8. 枚举
enum HTTP_CODE {
  OK = 200,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED
}
HTTP_CODE['200'] // OK
// 赋值后不允许改动，key不能是数字，value可以是数字或字符串
// 枚举值可以省略，第一个枚举值默认为0，后续的枚举值为上一个数字枚举值+1，上一个是字符串枚举值，则必须赋值






// 9. 无值：void 无return或者return undefined
// 开启strictNullChecks，null不可以赋值给void
function fn(): void{
  return 
}





// 10. never
function fn1(): never {
  throw new Error('error')
}





// 11. any:放弃类型监测，开启noImplicitAny后，函数参数出现隐式any报错

// 12. unknown:安全版any，没有任何属性方法，仅能赋值给any和unknown






// 13. interface
interface Point {
  x: number,
  readonly y: number, // 只读属性
  // color?: number, // 可选属性
  [key: string]: Persons, // 添加自定义任意属性，索引签名参数类型必须是string和number
  [key: number]: Student, // 当两者同时出现时，数字类型的值类型必须是字符串类型的值类型或子类型
}
class Persons {}
class Student extends Persons {}

// 使用接口描述函数
interface IEventFunc {
  (e: MouseEvent): void
}

function on(el: HTMLElement, eventName: string, callback: IEventFunc) {}

let div = document.querySelector('div')
if (div) {
  on(div, 'click', function(e) {
    e.clientX
  })
}

// 接口合并,同名非函数成员类型一致，同名函数重载
interface Box {
  width: number,
  height: number,
  fn(a: number): number
}

interface Box {
  scale: number,
  fn(a: string): string
}

let box: Box = {
  height: 5,
  width: 6,
  scale: 10,
  fn: function(a: any): any {
    return a
  }
}

interface o1 {x: number, y: string}
interface o2 {z: number}
// 使用es6语法等，需要设置target为es6或者添加lib es6
let o: o1 & o2 = Object.assign({}, {x: 1, y: 'lqf'}, {z: 2})







// 14. 字面量
function setPosition (el: Element, direction: 'left' | 'right') {}
let el = document.querySelector('div')
el && setPosition(el, 'left')





// 15. 类型别名
type dir = 'left' | 'right'
function setPosition1 (el: Element, direction: dir) {}

type callback = (a: string) => string
let fn2: callback = function(b) { return ''}
let fn3: (a: string) => string = function(b) {return ''}

// interface: 只能描述object/class/function，同名interface自动合并
// type：不能重名，能描述所有数据





// 16. 类型推导：根据当前上下文自动的推导出对应的类型标注，初始化变量、设置函数默认参数值，返回函数值时发生
let x = 1

// 17. 类型断言：断言只是一种预判，并不会数据本身产生实际的作用，即：类似转换，但并非真的转换
let img = document.querySelector('#img') // 此时为Element。无法访问某些具体属性
let img1 = <HTMLImageElement>document.querySelector('#img')
let img2 = document.querySelector('#img') as HTMLImageElement
img1 && img1.src


// 18. 函数
// 普通写法
function fn4(a: string): string {return ''}
let fn5: (a: string) => string = function(a) {return ''}
// type
type callback1 = (a: string) => string
let fn6: callback1 = function(b) { return ''}
// interface
interface ICallback {(a: string): string}
let fn7: ICallback = function(b) { return ''}
// 可选参数、默认参数
function sort(items?: Array<number>, order: 'desc'|'asc' = 'desc') {}
// 剩余参数
function merge(target: Object, ...others: Array<Object>) {
  return Object.assign(target, ...others)
}
// this 普通函数/箭头函数
interface T {
  x: number,
  fn: (x: number) => void
}
let obj2: T = {
  x: 1,
  fn(this: T, x: number) {
    console.log(this)
  }
}
let obj3: T = {
  x: 1,
  fn(this: T) {
    return () => {
      console.log(this)     
    }
  }
}

// 函数重载
interface PlainObject {
  (key: string): number | string
}
function css(ele: HTMLElement, attr: PlainObject): void
function css(ele: HTMLElement, attr: number, value: string | number): void
function css(ele: HTMLElement, attr: any, value?: any) {
  if (typeof attr === 'number' && value) {
    ele.style[attr] = value
  }
  if (typeof attr === 'object') {
    for (const key in attr) {
      if (Object.prototype.hasOwnProperty.call(attr, key)) {
        ele.style[attr] = attr[key]
      }
    }
  }
}

export default {}