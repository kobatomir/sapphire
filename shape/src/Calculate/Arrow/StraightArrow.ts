import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";

/**
 * 箭头直线 →
 * @param start 
 * @param end 
 */
export function StraightArrow(start: Coordinate, end: Coordinate): Coordinate[] {
    let maxArrowLength = 10000;
    let minArrowLength = 5000;
    let arrowScale = 0.2;
    let [v1, v2] = Vector.FromSomeArray(start, end);
    let length = v2.Minus(v1).Length;
    let max = maxArrowLength / length;
    let min = minArrowLength / length;
    max = max < min ? min : max;
    max = max > arrowScale ? arrowScale : max;
    return [start, end, v1.Minus(v2).Rotate(Math.PI / 6).Multiply(max).Add(v2).ToArray(), end, v1.Minus(v2).Rotate(-Math.PI / 6).Multiply(max).Add(v2).ToArray(), end];
}

