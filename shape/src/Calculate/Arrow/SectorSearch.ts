import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";
import { LineSearch } from "./LineSearch";

/**
 * 扇形搜索区
 * @param center 搜索中心
 * @param control 控制中心
 */
export function SectorSearch(center: Coordinate, control: Coordinate):Coordinate[] {
    let [v0, v1] = Vector.FromSomeArray(center, control);
    let r0 = v1.Minus(v0);
    let [r1, r2] = [r0.Rotate(-2 * Math.PI / 3), r0.Rotate(2 * Math.PI / 3)];
    let points= [center,control,v1.Add(r1).ToArray(),v0.Add(r2).ToArray(),v0.Minus(r1).ToArray(),v0.Add(r1).ToArray(),v0.Minus(r0).ToArray(),center];
    return LineSearch(points);
}