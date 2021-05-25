import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";
import { LineSearch } from "./LineSearch";

/** 平行搜索区 */
export function ParallSearch(points: Coordinate[]):Coordinate[] {
    let [v0, v1] = Vector.FromSomeArray(points[0], points[1]);
    let r0 = v1.Minus(v0);
    let r1 = r0.Rotate(Math.PI / 2);
    let last: Vector = v1;
    let push = [points[0], points[1]];
    for (let i = 2; i < points.length; i++) {
        let v = new Vector(points[i][0] - last.x, points[i][1] - last.y);
        let r = i % 2 === 0 ? r1 : r0;
        last = v.Project(r).Add(last);
        push.push(last.ToArray());
    }
    return LineSearch(push);
}