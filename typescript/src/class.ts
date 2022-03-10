/*
 * @Author: Lqf
 * @Date: 2021-10-26 09:30:51
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-27 13:36:47
 * @Description: 我添加了修改
 */
type AllowFileTypeList = 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif'

// 类的构建
class User {
  // 静态属性
  static readonly ALLOW_FILE_TYPE_LIST: Array<AllowFileTypeList> = ['png', 'gif', 'jpeg', 'webp', 'jpg']
  constructor(
    public id: number, 
    public username: string,
    private _allowFileTypes: Array<AllowFileTypeList>,
    protected pro: string, // 自身子类访问
    private _password: string,   // 自身访问
    readonly read: string  // 只读
    ) {}

  postArticle(title: string, content: string) {
    console.log(`${this.username} 发表了${title}`);
  }

  // 静态方法
  static info() {
    console.log(User.ALLOW_FILE_TYPE_LIST)
  }
  // 寄存器
  set password(password: string) {
    if (password.length >= 6) {
      this._password = password
    } 
  }
  get password(): string {
    return '****'
  }
}

// 继承，使用父类属性方法
class VIP extends User {
  constructor(
    id: number,
    username: string,
    public score: number,
    _allowFileTypes: Array<AllowFileTypeList>,
    pro: string, // 自身子类访问
    _password: string,   // 自身访问
    read: string  // 只读
    ) {
    super(id, username, _allowFileTypes, pro, _password, read)
  }
  postArticle(title: string, content: string): void
  postArticle(title: string, content: string, file: string): void
  postArticle(title: string, content: string, file?: string) {
    // this.score++
    // console.log(`${this.username} 发表了${title}, 积分:${this.score}`);
    super.postArticle(title, content)
    if (file) {
      this.postAttachment(file)
    }
  }
  postAttachment(file: string): void {
    console.log(`${this.username} 上传了附件：${file}`);
  }
}
let vip = new VIP(1, 'lqf', 90, ['png'], 'pro', '123', '43')
vip.postArticle('标题', '内容')
vip.postArticle('标题', '内容', '1.png')
let user = new User(1, 'lqf', ['jpg', 'gif'], 'pro', '123', 'qwe')
user.password = '123456'
User.ALLOW_FILE_TYPE_LIST
User.info()



/**
 * 抽象类，约束字类
 * - abstract修饰的方法没有方法体
 * - 类有抽象方法，类也必须抽象，并且不能实例化（因为有未实现的抽象方法
 * - 如果子类继承了抽象类，那么就必须实现抽象类的所有抽象方法，不然该子类也得声明为抽象类
 */
abstract class Component<T1, T2> {
  props: T1;
  state: T2;
  constructor(props: T1) {
    this.props = props
  }
  abstract render(): string
}

interface MyComponentProps {
  val: number
}
interface MyComponentState {
  x: number
}
class MyComponent extends Component<MyComponentProps, MyComponentState> implements Log, IStorage{
  constructor(props: MyComponentProps) {
    super(props)
    this.state = {
      x: 1
    }
  }
  render() {
    this.state.x
    this.props.val
    return '<MyComponent />'
  }

  getInfo() {
    return `组件:MyComponent,props:${this.props}, state:${this.state}`
  }

  save(data: string) {
    return data
  }

}

let myComponent = new MyComponent({val: 1})
myComponent.render()



// 接口
interface Log {
  getInfo(): string
}
interface IStorage {
  save(data: string): string
}

// 类与对象类型
class Person {
  static type = '人'
  name: string;
  age: number;
  gender: string;

// 类的类型
constructor(name: string, age: number, gender: '男' | '女') {
  this.name = name
  this.age = age
  this.gender = gender
}

  public eat(): void {}
}
interface PersonConstructor {
  new (name: string, age: number, gender: '男' | '女'): Person,
  type: string
}
// 对象类型
function fn1(arg: Person) {
  arg.eat()
}
// 类的类型
function fn2(arg: PersonConstructor) { // 或者 typeof Person
  new arg('Lqf', 20, '男')
}
let p1 = new Person('Lqf', 20, '男')
fn1( p1 )
fn2( Person )


/**
 * 类型系统
 * 类型保护：typeof，instanceof，in，字面量，自定义类型保护
 * 类型操作：typeof，keyof,in
 * 类型兼容
 */
function canEach(data: any): data is Element[] | NodeList { // xx is xx 类型谓词
  return data.forEach !== undefined
}
function fn3(elements: Element[] | NodeList | Element) {
  if (canEach(elements)) {
    elements.forEach((el: Element) => {
      el.classList.add('box')
    })
  } else {
    elements.classList.add('box')
  }
}


let str = 'lqf'
// let 声明的是变量，储存的数据程序运行过程中使用
let t = typeof str
// type 声明的是类型名称，值只在ts编译检测阶段使用，编译后没有该代码
type myType = typeof str

interface Person1 {
  name: string,
  age: number
}
type personKeys = keyof Person1 //  === type personKeys = 'name' | 'age'
let p2 = {
  name: 'lqf',
  age: 18
}
function getPersonVal(k: keyof typeof p2){
  return p2[k]
}
type newPerson = {
  // in 后面的值必须是 string，number，symbol
  [k in personKeys]: string
}


interface IFly {
  fly(): void
}

class Dog implements IFly{
  name: string
  age: number
  // eat() {} 
  fly() {}
}
class Cat implements IFly{
  name: string
  age: number
  catchMouse() {} // 多参数无影响
  fly() {}
}
function fn4(arg: Dog) {
  arg.name
}
let dog = new Dog()
let cat = new Cat()
fn4(cat) // cat 与 dog结构子类型相同，即为兼容

function fn5 (arg: IFly) {
  arg.fly()
}
fn5(dog)
fn5(cat)




// 泛型（函数，接口）接口使用看上面的Component
function getVal<T> (obj: T, k: keyof T) {
  return obj[k]
}

let obj1 = { x: 1, y: 2 }
let obj2 = { username: 'lqf', age: 22 }
getVal<typeof obj1>(obj1, 'x')
getVal<typeof obj2>(obj2, 'username')

// eg1
interface ResponseData<T> {
  code: number,
  message?: string,
  data: T
}
// 用户接口
interface ResponseUserData {
  id: number;    
  username: string;    
  email: string; 
} 
// 文章接口 
interface ResponseArticleData {
  id: number;    
  title: string;    
  author: ResponseUserData; 
}

async function getData<U>(url: string) {
  let response = await fetch(url)
  let data: Promise<ResponseData<U>> = await response.json()
  return data
}

~(async function () {
  let userData = await getData<ResponseUserData>('/user')
  let articleData = await getData<ResponseArticleData>('/article')
  userData.data.email
  articleData.data.author
})()


export default {}