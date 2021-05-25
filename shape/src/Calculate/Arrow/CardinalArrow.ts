import { Coordinate } from "ol/coordinate";
import { Cardinal } from "../Line/Cardinal";
import { StraightArrow } from "./StraightArrow";

/** 卡尔迪曲线箭头 */
export function CardinalArrow(point: Coordinate[]) {
    let data = Cardinal(point);
    let arrow = StraightArrow(data[data.length - 2], data[data.length - 1]);
    return [...data, ...arrow];
}