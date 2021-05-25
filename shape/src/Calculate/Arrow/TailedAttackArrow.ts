import { distance, getBaseLength, getQBSplinePoints, getThirdPoint, IsClockWise, mid } from "../Core/Shape";
import { getArrowBodyPoints, getArrowHeadPoints } from "./AttackArrow";
/**
 * 燕尾进攻箭头
 */
export function TailedAttackArrow(pnts: any[], headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number, tailWidthFactor: number, headTailFactor: number, swallowTailFactor: number) {
    let tailLeft = pnts[0];
    let tailRight = pnts[1];
    if (IsClockWise(pnts[0], pnts[1], pnts[2])) { tailLeft = pnts[1]; tailRight = pnts[0]; }
    let midTail = mid(tailLeft, tailRight);
    let bonePnts = [midTail].concat(pnts.slice(2));
    let headPnts = getArrowHeadPoints(bonePnts, tailLeft, tailRight, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor, headTailFactor);
    let neckLeft = headPnts[0];
    let neckRight = headPnts[4];
    let tailWidth = distance(tailLeft, tailRight);
    let allLen = getBaseLength(bonePnts);
    let len = allLen * tailWidthFactor * swallowTailFactor;
    let swallowTailPnt = getThirdPoint(bonePnts[1], bonePnts[0], 0, len, true);
    let factor = tailWidth / allLen;
    let bodyPnts = getArrowBodyPoints(bonePnts, neckLeft, neckRight, factor);
    let count = bodyPnts.length;
    let leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
    leftPnts.push(neckLeft);
    let rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
    rightPnts.push(neckRight);
    leftPnts = getQBSplinePoints(leftPnts);
    rightPnts = getQBSplinePoints(rightPnts);
    return leftPnts.concat(headPnts, rightPnts.reverse(), [swallowTailPnt, leftPnts[0]]);
}