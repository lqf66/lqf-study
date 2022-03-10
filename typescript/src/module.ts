/*
 * @Author: Lqf
 * @Date: 2021-10-27 10:41:47
 * @LastEditors: Lqf
 * @LastEditTime: 2021-10-27 10:51:39
 * @Description: 我添加了修改
 */

// 命名空间
namespace k1 {
  let a = 10;
  export var obj = {
      a
  }
}

namespace k1 {
  let b = 10;
  export var obj2 = {
      b
  }
}

namespace k2 {
  let a = 20;
  console.log(k1.obj);
}