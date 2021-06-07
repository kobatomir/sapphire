import { Coordinate } from "ol/coordinate";
/** 判断两个点相等 */
export function PointEqual(target:Coordinate,source:Coordinate) {
    return target[0]===source[0] && target[1] === source[1];
}