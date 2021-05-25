import { Coordinate } from "ol/coordinate";
import { Range } from "../Core/Range";
import { Vector } from "../Core/Vector";

/** 根据3个点确定 圆心坐标 */
export function GetCircleCenter(v0: Vector, v1: Vector, v2: Vector): Vector {
    //https://blog.csdn.net/liyuanbhu/article/details/52891868
    let x1 = v0.x, x2 = v1.x, x3 = v2.x;
    let y1 = v0.y, y2 = v1.y, y3 = v2.y;
    let a = x1 - x2;
    let b = y1 - y2;
    let c = x1 - x3;
    let d = y1 - y3;
    let e = ((x1 * x1 - x2 * x2) + (y1 * y1 - y2 * y2)) / 2.0;
    let f = ((x1 * x1 - x3 * x3) + (y1 * y1 - y3 * y3)) / 2.0;
    let det = b * c - a * d;
    let x = (b * f - d * e) / det;
    let y = (c * e - a * f) / det;
    return new Vector(x, y);
}

/**
 * 圆弧线方程
 * @param p0 起始点
 * @param p1 中间点
 * @param p2 终止点
 * @returns 
 */
export function Arc(p0: Coordinate, p1: Coordinate, p2: Coordinate): Coordinate[] {
    let [v0, v1, v2] = Vector.FromSomeArray(p0, p1, p2);
    let vcenter = GetCircleCenter(v0, v1, v2);
    let [r0, r1, r2] = [v0.Minus(vcenter), v1.Minus(vcenter), v2.Minus(vcenter)];
    let [a0, a1, a2] = [r0.Angle, r1.Angle, r2.Angle];
    let max = a0 < a1 ? (a2 < a0 ? a2 + Math.PI * 2 : Math.max(a2, a1)) : (a2 > a0 ? a2 - Math.PI * 2 : Math.min(a1, a2));
    let ceta = (max - a0) / 60
    return Range(0, 60).map(i => r0.Rotate(i * ceta).Add(vcenter).ToArray());
}