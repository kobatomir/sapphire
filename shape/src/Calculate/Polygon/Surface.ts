import { Coordinate } from "ol/coordinate";
import { Range } from "../Core/Range";
import { BasicNormal, CubucValue } from "../Core/Shape";
/**
 * 曲面
 * @param points 
 */
export function Surface(points: Coordinate[]) {
    let pnts = [...points, points[0], points[1]];
    let normals: Coordinate[] = [];
    for (let i = 0; i < pnts.length - 2; i++) {
        let normalPoints = BasicNormal(0.3, pnts[i], pnts[i + 1], pnts[i + 2]);
        normals = normals.concat(normalPoints);
    }
    let count = normals.length;
    normals = [normals[count - 1]].concat(normals.slice(0, count - 1));
    let pList: Coordinate[] = [];
    for (let i = 0; i < pnts.length - 2; i++) {
        let cat = Range(0, 100).map(t => CubucValue(t / 100, pnts[i], normals[i * 2], normals[i * 2 + 1], pnts[i + 1]))
        pList = [...pList, pnts[i], ...cat]
    }
    return pList
}