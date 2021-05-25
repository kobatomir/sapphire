import { Coordinate } from "ol/coordinate";
import { distance, getBisectorNormals, getCubicValue, getThirdPoint, mid } from "../Core/Shape";
/** 结集地 */
export function GatherPlace(points: Coordinate[], t: number) {
    let pnts: Coordinate[] = [...points];
    if (points.length === 2) {
        let midx = mid(pnts[0], pnts[1]);
        let d = distance(pnts[0], midx) / 0.9;
        let pnt = getThirdPoint(pnts[0], midx, Math.PI / 2, d, true);
        pnts = [pnts[0], pnt, pnts[1]];
    }
    let midx = mid(pnts[0], pnts[2]);
    pnts.push(midx, pnts[0], pnts[1]);

    let normals: Coordinate[] = [];
    for (let i = 0; i < pnts.length - 2; i++) {
        let pnt1 = pnts[i];
        let pnt2 = pnts[i + 1];
        let pnt3 = pnts[i + 2];
        let normalPoints = getBisectorNormals(t, pnt1, pnt2, pnt3);
        normals = normals.concat(normalPoints);
    }
    let count = normals.length;
    normals = [normals[count - 1]].concat(normals.slice(0, count - 1));
    let pList = [];
    for (let i = 0; i < pnts.length - 2; i++) {
        let pnt1 = pnts[i];
        let pnt2 = pnts[i + 1];
        pList.push(pnt1);
        for (let t = 0; t <= 100; t++) {
            let pnt = getCubicValue(t / 100, pnt1, normals[i * 2], normals[i * 2 + 1], pnt2);
            pList.push(pnt);
        }
        pList.push(pnt2);
    }
    return pList;
}