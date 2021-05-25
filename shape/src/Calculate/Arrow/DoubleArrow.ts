import { Coordinate } from "ol/coordinate";
import { distance, getAngleOfThreePoints, getBaseLength, getBezierPoints, getThirdPoint, IsClockWise, mid, wholeDistance } from "../Core/Shape";
/** 钳击 */
export function DoubleArrow(points: number[][], headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number
) {
    let tempPoint4 = points.length === 3 ? getTempPoint4(points[0], points[1], points[2]) : points[3];
    let connPoint = points.length === 3 || points.length === 4 ? mid(points[0], points[1]) : points[4];
    let clock = IsClockWise(points[0], points[1], points[2]);
    let leftArrowPnts = clock ? getArrowPoints(points[0], connPoint, tempPoint4, false, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) : getArrowPoints(points[1], connPoint, points[2], false, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
    let rightArrowPnts = clock ? getArrowPoints(connPoint, points[1], points[2], true, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) : getArrowPoints(connPoint, points[0], tempPoint4, true, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
    let m = leftArrowPnts.length;
    let t = (m - 5) / 2;
    let llBodyPnts = leftArrowPnts.slice(0, t);
    let lArrowPnts = leftArrowPnts.slice(t, t + 5);
    let lrBodyPnts = leftArrowPnts.slice(t + 5, m);

    let rlBodyPnts = rightArrowPnts.slice(0, t);
    let rArrowPnts = rightArrowPnts.slice(t, t + 5);
    let rrBodyPnts = rightArrowPnts.slice(t + 5, m);
    rlBodyPnts = getBezierPoints(rlBodyPnts);
    let bodyPnts = getBezierPoints(rrBodyPnts.concat(llBodyPnts.slice(1)));
    lrBodyPnts = getBezierPoints(lrBodyPnts);
    let pnts = rlBodyPnts.concat(rArrowPnts, bodyPnts, lArrowPnts, lrBodyPnts);
    return pnts;
}

function getTempPoint4(
    linePnt1: number[],
    linePnt2: number[],
    point: number[]
) {
    let midPnt = mid(linePnt1, linePnt2);
    let len = distance(midPnt, point);
    let angle = getAngleOfThreePoints(linePnt1, midPnt, point);
    let symPnt: any[], distance1: number, distance2: number, midx: any[];
    let HALF_PI = Math.PI / 2;
    if (angle < HALF_PI) {
        distance1 = len * Math.sin(angle);
        distance2 = len * Math.cos(angle);
        midx = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, false);
        symPnt = getThirdPoint(midPnt, midx, HALF_PI, distance2, true);
    } else if (angle >= HALF_PI && angle < Math.PI) {
        distance1 = len * Math.sin(Math.PI - angle);
        distance2 = len * Math.cos(Math.PI - angle);
        midx = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, false);
        symPnt = getThirdPoint(midPnt, midx, HALF_PI, distance2, false);
    } else if (angle >= Math.PI && angle < Math.PI * 1.5) {
        distance1 = len * Math.sin(angle - Math.PI);
        distance2 = len * Math.cos(angle - Math.PI);
        midx = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, true);
        symPnt = getThirdPoint(midPnt, midx, HALF_PI, distance2, true);
    } else {
        distance1 = len * Math.sin(Math.PI * 2 - angle);
        distance2 = len * Math.cos(Math.PI * 2 - angle);
        midx = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, true);
        symPnt = getThirdPoint(midPnt, midx, HALF_PI, distance2, false);
    }
    return symPnt;
}

function getArrowPoints(pnt1: Coordinate, pnt2: Coordinate, pnt3: Coordinate, clockWise: boolean, headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number) {
    let midPnt = mid(pnt1, pnt2);
    let len = distance(midPnt, pnt3);
    let midPnt1 = getThirdPoint(pnt3, midPnt, 0, len * 0.3, true);
    let midPnt2 = getThirdPoint(pnt3, midPnt, 0, len * 0.5, true);
    midPnt1 = getThirdPoint(midPnt, midPnt1, Math.PI / 2, len / 5, clockWise);
    midPnt2 = getThirdPoint(midPnt, midPnt2, Math.PI / 2, len / 4, clockWise);
    let points = [midPnt, midPnt1, midPnt2, pnt3];
    // 计算箭头部分
    let arrowPnts = getArrowHeadPoints(points, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
    let neckLeftPoint = arrowPnts[0];
    let neckRightPoint = arrowPnts[4];
    // 计算箭身部分
    let tailWidthFactor = distance(pnt1, pnt2) / getBaseLength(points) / 2;
    let bodyPnts = getArrowBodyPoints(points, neckLeftPoint, neckRightPoint, tailWidthFactor);
    let n = bodyPnts.length;
    let lPoints = bodyPnts.slice(0, n / 2);
    let rPoints = bodyPnts.slice(n / 2, n);
    lPoints.push(neckLeftPoint);
    rPoints.push(neckRightPoint);
    lPoints = lPoints.reverse();
    lPoints.push(pnt2);
    rPoints = rPoints.reverse();
    rPoints.push(pnt1);
    return lPoints.reverse().concat(arrowPnts, rPoints);
}

function getArrowHeadPoints(points: Coordinate[], headHeightFactor: number, headWidthFactor: number, neckHeightFactor: number, neckWidthFactor: number) {
    let len = getBaseLength(points);
    let headHeight = len * headHeightFactor;
    let headPnt = points[points.length - 1];
    let headWidth = headHeight * headWidthFactor;
    let neckWidth = headHeight * neckWidthFactor;
    let neckHeight = headHeight * neckHeightFactor;
    let headEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, headHeight, true);
    let neckEndPnt = getThirdPoint(points[points.length - 2], headPnt, 0, neckHeight, true);
    let headLeft = getThirdPoint(headPnt, headEndPnt, Math.PI / 2, headWidth, false);
    let headRight = getThirdPoint(headPnt, headEndPnt, Math.PI / 2, headWidth, true);
    let neckLeft = getThirdPoint(headPnt, neckEndPnt, Math.PI / 2, neckWidth, false);
    let neckRight = getThirdPoint(headPnt, neckEndPnt, Math.PI / 2, neckWidth, true);
    return [neckLeft, headLeft, headPnt, headRight, neckRight];
}

function getArrowBodyPoints(points:Coordinate[], neckLeft:Coordinate, neckRight:Coordinate, tailWidthFactor:number) {
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
