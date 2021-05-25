import { Vector } from "../Core/Vector";
import { Range } from "../Core/Range"
import { Coordinate } from "ol/coordinate";

/**
 * 3次贝塞尔曲线
 * @param p0 
 * @param p1 
 * @param p2 
 * @param p3 
 * @returns 
 */
export function BezierThree(p0: number[], p1: number[], p2: number[], p3: number[]): Coordinate[] {
    let number = 100;
    let [v0, v1, v2, v3] = Vector.FromSomeArray(p0, p1, p2, p3);
    return Range(0, 99).map(i => {
        let t = i / number;
        return v0.Multiply(Math.pow((1 - t), 3)).Add(v1.Multiply(3 * t * Math.pow((1 - t), 2))).Add(v2.Multiply(3 * t * t * (1 - t))).Add(v3.Multiply(Math.pow(t, 3))).ToArray()
    });
}