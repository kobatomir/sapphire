import { Coordinate } from "ol/coordinate";

/** 判断两个点是否相同 */
export function PointEqual(target: Coordinate, source: Coordinate) {
    return target[0] === source[0] && target[1] === source[1];
}
/** 判断集合最后点是否相等 */
export function PointLastEqual(list: Coordinate[], target: Coordinate) {
    if (list.length <= 0) return false;
    return PointEqual(list[list.length - 1], target);
}