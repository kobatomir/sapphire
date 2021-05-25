import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";

/** 贝塞尔N次曲线方程 */
export function BezierForever(array: Coordinate[]):Coordinate[] {
    let number = 100;
    let v = Vector.FromSomeArray(...array);
    let points = [];
    for (let i = 0; i <= 100; i++) {
        let t = (1 / number) * i;
        let v0 = Vector.Zero;
        for (let x = 0; x < v.length; x++) {
            v0 = v0.Add(v[x].Multiply(Math.pow(1 - t, v.length - x - 1) * Math.pow(t, x) * Pasic(v.length - 1, x)));
        }
        points.push(v0.ToArray());
    }
    return points;
}

/** 阶乘 */
function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/** 杨辉三角
 *@param {number} l 层数
 *@param {number}  x  项 0开始
 */
function Pasic(l: number, x: number) {
    return factorial(l) / (factorial(x) * factorial(l - x));
}
