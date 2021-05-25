import { Coordinate } from "ol/coordinate";

/**
 * Cardina
 * Pu = P(k-1) * (-su^3 + 2su^2 - su) + P(k)* [(2-s)u^3+ (s-3)u^2+1]+ P(k+1)[(s-2)*u^3+ (3-2s)*u^2+ su] + P(k+2)(su^3- su^2)
 * @description https://blog.csdn.net/timewolf/article/details/761359
 */
export function Cardinal(points: Coordinate[]):Coordinate[] {
    if (points.length === 2) return points;
    let draw = [points[0], ...points, points[points.length - 1]];
    let count = 100;
    let push = [];
    for (let i = 0; i < points.length - 1; i++) {
        for (let c = 0; c < count; c++) {
            let u = (1 / count) * c;
            push.push(CardinalPoint(u, 0, draw[i], draw[i + 1], draw[i + 2], draw[i + 3]));
        }
    }
    return push;

}
/** 计算Cardinal点
 * @param {number} u 点序
 * @param {number} t 张力
 * @param {number[]} v0,v1,v2,v3 依次4个点
 */
export function CardinalPoint(u: number, t: number, v0: Coordinate, v1: Coordinate, v2: Coordinate, v3: Coordinate) {
    let s = (1 - t) / 2;
    return [Calc(v0[0], v1[0], v2[0], v3[0], s, u), Calc(v0[1], v1[1], v2[1], v3[1], s, u)];
}

function Calc(a: number, b: number, c: number, d: number, s: number, u: number) {
    return a * (2 * s * u * u - s * u * u * u - s * u) +
        b * ((2 - s) * u * u * u + (s - 3) * u * u + 1) +
        c * ((s - 2) * u * u * u + (3 - 2 * s) * u * u + s * u) +
        d * (s * u * u * u - s * u * u);
}