import { Coordinate } from "ol/coordinate";

/** 2维 向量 */
export class Vector {
    constructor(public x: number, public y: number) { }

    /** 转换为数组 */
    ToArray(): Coordinate {
        return [this.x, this.y];
    }

    /** 坐标转换为向量 */
    static FromArray(array: Coordinate): Vector {
        return new Vector(array[0], array[1]);
    }

    /** 转换多个坐标为向量 */
    static FromSomeArray(...array: Coordinate[]): Vector[] {
        return array.map(s => this.FromArray(s));
    }

    /** 添加向量 返回新向量 */
    Add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    /** 减去向量  返回新向量*/
    Minus(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    /** 反转向量 */
    Invert(): Vector {
        return new Vector(this.x * -1, this.y * -1);
    }

    /** 复制到自己 */
    Copy(v: Vector): Vector {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    Clone(): Vector {
        return new Vector(this.x, this.y);
    }

    static get Zero(): Vector {
        return new Vector(0, 0);
    }

    /** 点积/内积/数量积 */
    Dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }

    /** 标量乘法  */
    Multiply(number: number): Vector {
        return new Vector(number * this.x, this.y * number);
    }

    /**
     * 是否为 0 向量
     */
    get IsZero(): boolean {
        return this.x === 0 && this.y === 0;
    }

    /** 旋转rad */
    Rotate(rad: number): Vector {
        let nx = this.x * Math.cos(rad) - this.y * Math.sin(rad);
        let ny = this.x * Math.sin(rad) + this.y * Math.cos(rad);
        return new Vector(nx, ny);
    }

    /**
   * 向量 于中心点 v 旋转 rad弧度
   * ### 即 this.subtract(v).rotate(rad).add(v)
   * @param center 旋转中心
   * @param rad 旋转量
   */
    RotateFrom(center: Vector, rad: number): Vector {
        return this.Minus(center).Rotate(rad).Add(center);
    }

    /** 角度 */
    get Angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /** 将向量投影到v向量上 */
    Project(v: Vector): Vector {
        let l=  this.Dot(v)/ (v.x*v.x + v.y*v.y);
        return v.Multiply(l);
    }

    /** 向量长度 */
    get Length():number{
        let sql= this.x*this.x + this.y*this.y;
        return Math.sqrt(sql);
    }

    /** 单位向量 */
    get Normalize():Vector{
        let length= this.Length;
        if(length===0 ) return new Vector(1,0);
        else return new Vector(this.x/length,this.y/length);
    }
}