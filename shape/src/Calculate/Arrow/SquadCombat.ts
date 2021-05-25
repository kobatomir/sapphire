import { Coordinate } from "ol/coordinate";
import { getBaseLength, getQBSplinePoints, getThirdPoint } from "../Core/Shape";
import { getArrowBodyPoints, getArrowHeadPoints } from "./AttackArrow";

/** 作战箭头 */
export function SquadCombat(pnts: Coordinate[], headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number, headTailFactor: number) {
    let tailPnts = getTailPoints(pnts);
    let headPnts = getArrowHeadPoints(pnts, tailPnts[0], tailPnts[1], headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor, headTailFactor);
    let neckLeft = headPnts[0];
    let neckRight = headPnts[4];
    let bodyPnts = getArrowBodyPoints(pnts, neckLeft, neckRight, 0.1);
    let count = bodyPnts.length;
    let leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, count / 2));
    leftPnts.push(neckLeft);
    let rightPnts = [tailPnts[1]].concat(bodyPnts.slice(count / 2, count));
    rightPnts.push(neckRight);
    leftPnts = getQBSplinePoints(leftPnts);
    rightPnts = getQBSplinePoints(rightPnts);
    return leftPnts.concat(headPnts, rightPnts.reverse());
}

function getTailPoints(points: Coordinate[]) {
    let allLen = getBaseLength(points);
    let tailWidth = allLen * 0.1;
    let tailLeft = getThirdPoint(points[1], points[0], Math.PI / 2, tailWidth, false);
    let tailRight = getThirdPoint(points[1], points[0], Math.PI / 2, tailWidth, true);
    return [tailLeft, tailRight];
}
