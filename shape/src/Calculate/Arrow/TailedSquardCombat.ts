import { Coordinate } from "ol/coordinate";
import { getBaseLength, getQBSplinePoints, getThirdPoint } from "../Core/Shape";
import { getArrowBodyPoints, getArrowHeadPoints } from "./AttackArrow";

/**燕尾作战箭头 */
export function TailedSquadCombat(pnts: Coordinate[], headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number, tailWidthFactor: number, headTailFactor: number, swallowTailFactor: number) {
    let tailPnts = getTailPoints(pnts, swallowTailFactor, tailWidthFactor);
    let headPnts = getArrowHeadPoints(pnts, tailPnts[0], tailPnts[2], headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor, headTailFactor);
    let neckLeft = headPnts[0];
    let neckRight = headPnts[4];
    let bodyPnts = getArrowBodyPoints(pnts, neckLeft, neckRight, tailWidthFactor);
    let count = bodyPnts.length;
    let leftPnts = [tailPnts[0]].concat(bodyPnts.slice(0, count / 2));
    leftPnts.push(neckLeft);
    let rightPnts = [tailPnts[2]].concat(bodyPnts.slice(count / 2, count));
    rightPnts.push(neckRight);
    leftPnts = getQBSplinePoints(leftPnts);
    rightPnts = getQBSplinePoints(rightPnts);
    return leftPnts.concat(headPnts, rightPnts.reverse(), [tailPnts[1], leftPnts[0]]);
}

function getTailPoints(points: Coordinate[], swallowTailFactor: number, tailWidthFactor: number) {
    let allLen = getBaseLength(points);
    let tailWidth = allLen * tailWidthFactor;
    let tailLeft = getThirdPoint(points[1], points[0], Math.PI / 2, tailWidth, false);
    let tailRight = getThirdPoint(points[1], points[0], Math.PI / 2, tailWidth, true);
    let len = tailWidth * swallowTailFactor;
    let swallowTailPnt = getThirdPoint(points[1], points[0], 0, len, true);
    return [tailLeft, swallowTailPnt, tailRight];
}
