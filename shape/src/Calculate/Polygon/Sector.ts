import { Coordinate } from "ol/coordinate";
import { Range } from "../Core/Range";
import { Vector } from "../Core/Vector";

/**
 * 扇形生成器
 * @param center 中心点
 * @param start 起点
 * @param end  终点
 */
export function Sector(center: Coordinate, start: Coordinate, end: Coordinate): Coordinate[] {
    let [vc, vstart, vend] = Vector.FromSomeArray(center, start, end);
    let [as, ae] = [vstart.Minus(vc).Angle, vend.Minus(vc).Angle];
    ae = ae < as ? ae + Math.PI * 2 : ae;
    let angle = ae - as;
    let data= Range(0, 60).map(i => vstart.RotateFrom(vc, angle * i / 60).ToArray());
    return [center,...data]
}