/*
 * @Author: Lqf
 * @Date: 2021-10-27 10:53:43
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-27 15:19:12
 * @Description: 我添加了修改
 */

import 'reflect-metadata'

/**
 * 打印顺序为实例 -> 静态 -> 类 / 属性 -> 访问符 -> 参数 -> 方法
*/
function d1(target: Function) {
  // console.log(typeof target, target)
}

function d2(target: any, name: string) {
  // console.log(typeof target, name)
}

function d3(target: any, name: string, descriptor: PropertyDescriptor) {
  // console.log(typeof target, name, descriptor)
}

function d4(target: any, name: string, descriptor: PropertyDescriptor) {
  // console.log(typeof target, name, descriptor)
}

function d5(target: any, name: string, index: number) {
  // console.log(typeof target, name, index)
}


// function My(type: string) {
//   return function(target: Function) {
//     target.prototype.type = type
//   }
// }

function log(type?: string) {
  return function(target: any, name: string, descriptor: PropertyDescriptor) {
    let fn = descriptor.value // 函数
    descriptor.value = function (z: number) {
      let result = fn(z) // 执行原生函数
      let _type = type
      if (!_type) {
        if (typeof target === 'function') {
          _type = Reflect.getMetadata('type', target)
        } else {
          _type = Reflect.getMetadata('type', target.constructor)
        }
      }
      console.log({
        type: _type, name, z, result
      }, 'type')
      return result
    }
  }
}

function emitDecoratorMetadata() {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    console.log(descriptor.value.length)
    // 打开emitDecoratorMetadata后自动添加
    console.log('design:type', Reflect.getMetadata('design:type', target, name))
    console.log('design:paramtypes', Reflect.getMetadata('design:paramtypes', target, name))
    console.log('design:returntype', Reflect.getMetadata('design:returntype', target, name))

    let _t = Reflect.getMetadata('design:paramtypes', target, name)[0]
    let value = descriptor.value
    if (_t === Number) {
      value(100)
    }
    if (_t === String) {
      value('Lqf')
    }
    if (_t === Date) {
      value(new Date)
    }
  }
}


@d1
@Reflect.metadata('type', 'log')
class MyClass {

  @d2
  static property1: string

  @d2
  property2: number

  @d3
  get b() { return 1 }

  @d3
  static get c() { return 2 }

  @d4
  public method1(@d5 x: number, @d5 y: number) {}

  @d4
  @log()
  static method2(z: number) {
    return z * 2
  }

  @log('storage')
  static method3(z: number) {
    return z * 3
  }

  @emitDecoratorMetadata()
  static method4(x?: number): string{
    console.log(x)
    return ''
  }
}

let method2 = MyClass.method2(2)
let method3 = MyClass.method3(2)
let method4 = MyClass.method4(123)








// Reflect用法
@Reflect.metadata('n', 1)
class A {
    @Reflect.metadata('n', 2)
    public static method1() {
    }

    @Reflect.metadata('n', 4)
    public method2() {
    }
}

let obj = new A;

// Reflect.defineMetadata( 'n', 1, A );
// Reflect.defineMetadata( 'n', 2, A, 'method1' );
// Reflect.defineMetadata( 'n', 3, obj );
// Reflect.defineMetadata( 'n', 4, obj, 'method2' );

console.log(Reflect.getMetadata('n', A));
console.log(Reflect.getMetadata('n', A, 'method1'));
console.log(Reflect.getMetadata('n', obj));
console.log(Reflect.getMetadata('n', obj, 'method2'));

export default {}