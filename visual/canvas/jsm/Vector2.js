/*
 * @Author: Lqf
 * @Date: 2021-09-27 21:09:13
 * @LastEditors: Lqf
 * @LastEditTime: 2021-09-30 22:13:46
 * @Description: 我添加了修改
 */
//建立二维向量类
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    //加法 add(v)
    add (v) {
        this.x += v.x
        this.y += v.y
        return this
    }

    //减法 sub(v)
    sub (v) {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    //角度的读取 angle()
    angle () {
        const { x, y } = this
        let dir = Math.atan2(y, x)
        if (dir < 0) { dir += Math.PI * 2 }
        return dir
    }


    //旋转 rotate(a)
    rotate (a) {
        const c = Math.cos(a)
        const s = Math.sin(a)
        const { x, y } = this
        this.x = x * c - y * s
        this.y = x * s + y * c
        return this
    }

    //长度读取 length()
    length () {
        const { x, y } = this
        return Math.sqrt(x * x + y * y)
    }

    //设置长度 setLength(len)
    setLength (len) {
        const { x, y } = this
        const r = this.length()
        const c = x / r
        const s = y / r
        this.x = c * len
        this.y = s * len
        return this
    }

    //克隆 clone()
    clone () {
        return new Vector2(this.x, this.y)
    }

    //拷贝 copy(v)
    copy (v) {
        this.x = v.x
        this.y = v.y
        return this
    }


    //极坐标 polar(len长度，dir方向)
    static polar (len, dir) {
        return new Vector2(
            Math.cos(dir) * len,
            Math.sin(dir) * len
        )
    }
}