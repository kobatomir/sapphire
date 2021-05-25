import { Coordinate } from "ol/coordinate";
import { Range } from "../Core/Range";
import { Vector } from "../Core/Vector";
import { GetCircleCenter } from "../Line/Arc";
/**
 * 弓形生成器
 * @param points 
 */
export function Lune(start: Coordinate, end: Coordinate): Coordinate[];
export function Lune(start: Coordinate, end: Coordinate, control: Coordinate): Coordinate[]
export function Lune(start: Coordinate, end: Coordinate, contol?: Coordinate) {
    let [vs, ve] = Vector.FromSomeArray(start, end);
    if (contol == null) {
        let middle = vs.Add(ve).Multiply(0.5);
        let rile = Range(0, 60).map(i => ve.RotateFrom(middle, i * Math.PI / 60).ToArray());
        return [start, end, ...rile, start];
    }
    let vc = Vector.FromArray(contol);
    let center = GetCircleCenter(vs, vc, ve);
    let [re, rs, rc] = [ve.Minus(center).Angle, vs.Minus(center).Angle, vc.Minus(center).Angle];
    let vstart: Vector = rs < re ? (rs < rc && rc < re ? vs : ve) : (re < rc && rc < rs ? ve : vs);
    let deta = rs < re ? (rs < rc && rc < re ? re - rs : rs + Math.PI * 2 - re) : (re < rc && rc < rs ? rs - re : re + Math.PI * 2 - rs);
    let rid = Range(0, 60).map(i => vstart.RotateFrom(center, i * deta / 60).ToArray());
    return rid;
}


