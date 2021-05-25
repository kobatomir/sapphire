import { Coordinate } from "ol/coordinate";
import { Range } from "../Core/Range";
import { Vector } from "../Core/Vector";

/**
 * 椭圆构建器
 * @param x x轴交点
 * @param y y轴交点
 */
export function Ellipse(x: Coordinate, y: Coordinate): Coordinate[];
/**
 * 椭圆构建器
 * @param p0 x轴交点
 * @param p1 控制点
 * @param center 轴心坐标
 */
export function Ellipse(x: Coordinate, y: Coordinate, center: Coordinate): Coordinate[];
export function Ellipse(x: Coordinate, y: Coordinate, center?: Coordinate) {
    center = center || [y[0], x[1]];
     let [v0, v1, vc] = Vector.FromSomeArray(x, y, center);
     let count = 100;
     let rx = v0.Minus(vc);
     let rxy = rx.Rotate(Math.PI / 2);
     let ry = v1.Minus(vc).Project(rxy);
     let a = rx.Length;
     let b = ry.Length;
    return Range(0, 99).map(i => {
        let ceta = (Math.PI * 2 * i) / count;
        let v = new Vector(a * Math.cos(ceta), b * Math.sin(ceta));
        return v.Rotate(rx.Angle).Add(vc).ToArray()
    });
}