import { Vector } from "../Core/Vector";
import { Range } from "../Core/Range"

/**
 * 二次贝塞尔曲线
 * @param p0 点1
 * @param p1 控制点
 * @param p2 点2
 * @returns 
 */
export function BezierTwo(p0: number[], p1: number[], p2: number[]) {
    let number = 100;
    let [v0, v1, v2] = Vector.FromSomeArray(p0, p1, p2);
    return Range(0, 99).map(i => {
        let t = i / number;
        return v0.Multiply((1 - t) * (1 - t)).Add(v1.Multiply(2 * t * (1 - t))).Add(v2.Multiply(t * t)).ToArray()
    })
}