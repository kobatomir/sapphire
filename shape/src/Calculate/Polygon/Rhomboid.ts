import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";
/** 平行四边形 */
export function Rhomboid(p0: Coordinate, p1: Coordinate, control: Coordinate) {
    let [v0, v1, vc] = Vector.FromSomeArray(p0, p1, control);
    let rc = vc.Minus(v1).Add(v0).ToArray();
    return [p0, p1, control, rc];
}