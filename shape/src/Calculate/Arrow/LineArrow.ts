import { Coordinate } from "ol/coordinate";
import { StraightArrow } from "./StraightArrow";

/** 折线箭头 */
export function LineArrow(points: Coordinate[]) {
    let r0 = points.length > 2 ? points.slice(0, points.length - 2) : [];
    let arrow = StraightArrow(points[points.length - 2], points[points.length - 1]);
    return [...r0, ...arrow];
}