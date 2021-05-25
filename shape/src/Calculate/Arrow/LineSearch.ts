import { Coordinate } from "ol/coordinate";
import { StraightArrow } from "./StraightArrow";
/**
 * 折线搜索区
 * @param points  点
 * @returns 
 */
export function LineSearch(points: Coordinate[]):Coordinate[] {
    debugger
    let push: Coordinate[] = [];
    for (let i = 0; i < points.length - 1; i++) {
        push = push.concat(StraightArrow(points[i], points[i + 1]));
    }
    return push;
}