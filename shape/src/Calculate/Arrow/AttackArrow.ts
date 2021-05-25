import { Coordinate } from "ol/coordinate";
import { distance, getAngleOfThreePoints, getBaseLength, getQBSplinePoints, getThirdPoint, IsClockWise, mid, wholeDistance } from "../Core/Shape";

export function AttrackArrow(pnts: Coordinate[], headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number, headTailFactor: number) {
    // 计算箭尾
    let tailLeft = pnts[0];
    let tailRight = pnts[1];
    if (IsClockWise(pnts[0], pnts[1], pnts[2])) {
        tailLeft = pnts[1];
        tailRight = pnts[0];
    }
    let midTail = mid(tailLeft, tailRight);
    let bonePnts = [midTail].concat(pnts.slice(2));
    // 计算箭头
    let headPnts = getArrowHeadPoints(bonePnts, tailLeft, tailRight, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor, headTailFactor);
    let neckLeft = headPnts[0];
    let neckRight = headPnts[4];
    let tailWidthFactor = distance(tailLeft, tailRight) / getBaseLength(bonePnts);
    // 计算箭身
    let bodyPnts = getArrowBodyPoints(bonePnts, neckLeft, neckRight, tailWidthFactor);
    // 整合
    let count = bodyPnts.length;
    let leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
    leftPnts.push(neckLeft);
    let rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
    rightPnts.push(neckRight);

    leftPnts = getQBSplinePoints(leftPnts);
    rightPnts = getQBSplinePoints(rightPnts);
    return leftPnts.concat(headPnts, rightPnts.reverse());
}

export function getArrowHeadPoints(points: Coordinate[], tailLeft: Coordinate, tailRight: Coordinate, headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number, headTailFactor: number) {
    let len = getBaseLength(points);
    let headHeight = len * headHeightFactor;
    let headPnt = points[points.length - 1];
    len = distance(headPnt, points[points.length - 2]);
    let tailWidth = distance(tailLeft, tailRight);
    if (headHeight > tailWidth * headTailFactor) {
        headHeight = tailWidth * headTailFactor;
    }
    let headWidth = headHeight * headWidthFactor;
    let neckWidth = headHeight * neckWidthFactor;
    headHeight = headHeight > len ? len : headHeight;
    let neckHeight = headHeight * neckHeightFactor;
    let headEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
    let neckEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);
    let headLeft = getThirdPoint(headPnt, headEndPnt, Math.PI / 2, headWidth, false);
    let headRight = getThirdPoint(headPnt, headEndPnt, Math.PI / 2, headWidth, true);
    let neckLeft = getThirdPoint(headPnt, neckEndPnt, Math.PI / 2, neckWidth, false);
    let neckRight = getThirdPoint(headPnt, neckEndPnt, Math.PI / 2, neckWidth, true);
    return [neckLeft, headLeft, headPnt, headRight, neckRight];
}
export function getArrowBodyPoints(points: Coordinate[], neckLeft: Coordinate, neckRight: Coordinate, tailWidthFactor: number) {
    let allLen = wholeDistance(points);
    let len = getBaseLength(points);
    let tailWidth = len * tailWidthFactor;
    let neckWidth = distance(neckLeft, neckRight);
    let widthDif = (tailWidth - neckWidth) / 2;
    let tempLen = 0,
        leftBodyPnts = [],
        rightBodyPnts = [];
    for (let i = 1; i < points.length - 1; i++) {
        let angle =
            getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
        tempLen += distance(points[i - 1], points[i]);
        let w = (tailWidth / 2 - (tempLen / allLen) * widthDif) / Math.sin(angle);
        let left = getThirdPoint(
            points[i - 1],
            points[i],
            Math.PI - angle,
            w,
            true
        );
        let right = getThirdPoint(points[i - 1], points[i], angle, w, false);
        leftBodyPnts.push(left);
        rightBodyPnts.push(right);
    }
    return leftBodyPnts.concat(rightBodyPnts);
}
