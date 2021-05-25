import { Vector } from "../Core/Vector";
import { Range } from "../Core/Range";
import { Coordinate } from "ol/coordinate";

/** 正多边形创建器
 *  @param center 中心点
 *  @param control 控制点
 *  @param size 边数
 */
export function RegularPolygon(center: Coordinate, control: Coordinate, size: number) {
    size = size || 5;
    let [vcenter, vcontrol] = Vector.FromSomeArray(center, control);
    let push = Range(0, size - 1).map(i => vcontrol.RotateFrom(vcenter, Math.PI * 2 * i / size).ToArray());
    push.push(push[0]);
    return push;
}