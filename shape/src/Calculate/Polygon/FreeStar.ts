import { Vector } from "../Core/Vector";
import { Range } from "../Core/Range";
import { Coordinate } from "ol/coordinate";

/** 自由多边星形创建器
 *  @param center 中心点
 *  @param control 控制点
 *  @param size 边数
 *  @param rid 比率
 */
export function FreeStar(center: Coordinate, control: Coordinate, size: number, rid: number) {
    let [vcenter, vcontrol] = Vector.FromSomeArray(center, control);
    let ceta = Math.PI * 2 / size; //角度
    let deta = vcontrol.Minus(vcenter).Rotate(ceta / 2);
    let virtul = deta.Normalize.Multiply(deta.Length * rid).Add(vcenter);
    let push= Range(0, 2 * size - 1).map(i => (i % 2 === 0 ? vcontrol : virtul).RotateFrom(vcenter, (i - i % 2) / 2 * ceta).ToArray())
    push.push(push[0]);
    return push;
}