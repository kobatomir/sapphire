import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";

/**
 * 矩形旗帜生成器
 * @param p0 
 * @param p1 
 * @returns 
 */
export function RectangleFlag(p0: Coordinate, p1: Coordinate): Coordinate[] {
    let [v0, v1] = Vector.FromSomeArray(p0, p1);
    let y = (v0.y + v1.y) / 2;
    return [[v0.x, v1.y], [v0.x, y], [v0.x, v0.y], [v1.x, v0.y], [v1.x, y], [v0.x, y]];
}