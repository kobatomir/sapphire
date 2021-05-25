import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";
/**
 * 正菱形生成器
 * @param x  x轴交点
 * @param y  y轴交点
 */
export function Rhombus(x: Coordinate, y: Coordinate): Coordinate[];

/**
 * 斜菱形生成器
 * @param x x交点
 * @param y y交点
 * @param center 中心点
 */
export function Rhombus(x: Coordinate, y: Coordinate, center: Coordinate): Coordinate[];

export function Rhombus(x: Coordinate, y: Coordinate, center?: Coordinate) {
    center = center || [y[0], x[1]];
    let [vx, vy, vc] = Vector.FromSomeArray(x, y, center);
    let rx = vx.Minus(vc);
    let rt = rx.Rotate(Math.PI / 2);
    let ry = vy.Minus(vc).Project(rt);
    return [x, vc.Add(ry).ToArray(), vc.Minus(rx).ToArray(), vc.Minus(ry).ToArray()];
}