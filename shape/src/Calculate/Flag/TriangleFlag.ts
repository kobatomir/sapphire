import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";


/** 三角旗帜
 * @param p0 左上角
 * @param p1 右下角
 */
export function TriangleFlag(p0: Coordinate, p1: Coordinate): Coordinate[] {
    let [v1, v2] = Vector.FromSomeArray(p0, p1);
    let y = (v1.y + v2.y) / 2;
    return [[v1.x, v2.y], [v1.x, y], [v1.x, v1.y], [v2.x, y], [v1.x, y]];
}
