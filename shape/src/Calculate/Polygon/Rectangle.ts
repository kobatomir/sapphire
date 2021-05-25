import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";

export function Rectangle(points: Coordinate[]): Coordinate[] {
    if (points.length === 2) {
        let [pt1, pt2] = [points[0], points[1]];
        return [[pt1[0], pt1[1]],
        [pt2[0], pt1[1]],
        [pt2[0], pt2[1]],
        [pt1[0], pt2[1]],
        [pt1[0], pt1[1]]];
    }
    let [v0, v1, v2] = Vector.FromSomeArray(points[0], points[1], points[points.length - 1]);
    let r0 = v0.Minus(v1);
    let r1 = r0.Rotate(-Math.PI / 2);
    let p = v2.Minus(v1).Project(r1).Add(v1);
    let d2 = p.Add(r0);
    return [points[0], points[1], p.ToArray(), d2.ToArray()];
}