import { Coordinate } from "ol/coordinate";
import { Vector } from "./Vector";

export function Normal(v1: Vector, v2: Vector, v3: Vector) {
    let [r1, r3] = [v1.Minus(v2), v3.Minus(v2)];
    return r1.Normalize.Add(r3.Normalize);
}

export function IsClockWise(pnt1:Coordinate, pnt2:Coordinate, pnt3:Coordinate) {
    return (
      (pnt3[1] - pnt1[1]) * (pnt2[0] - pnt1[0]) >
      (pnt2[1] - pnt1[1]) * (pnt3[0] - pnt1[0])
    );
  }

export function CloseWise(v1: Vector, v2: Vector, v3: Vector) {
    return (v3.y - v1.y) * (v2.x - v1.x) > (v2.y - v1.y) * (v3.x - v1.x);
}

export function CubucValue(t: number, start: Coordinate, p1: Coordinate, p2: Coordinate, end: Coordinate) {
    t = Math.max(Math.min(t, 1), 0);
    var tp = 1 - t;
    var t2 = t * t;
    var t3 = t2 * t;
    var tp2 = tp * tp;
    var tp3 = tp2 * tp;
    var x = tp3 * start[0] + 3 * tp2 * t * p1[0] + 3 * tp * t2 * p2[0] + t3 * end[0];
    var y = tp3 * start[1] + 3 * tp2 * t * p1[1] + 3 * tp * t2 * p2[1] + t3 * end[1];
    return [x, y];
}

export function BasicNormal(t: number, p1: Coordinate, p2: Coordinate, p3: Coordinate) {
    let [v1, v2, v3] = Vector.FromSomeArray(p1, p2, p3)
    let normal = Normal(v1, v2, v3);
    let distance = normal.Length;
    let norm = normal.Normalize;
    let d1 = v1.Minus(v2).Length;
    let d2 = v3.Minus(v2).Length;
    if (distance > 0.0001) {
        let clock = CloseWise(v1, v2, v3) ? 1 : -1;
        let dt = t * d1;
        let x = v2.x - dt * norm.y * clock;
        let y = v2.y + dt * norm.x * clock;
        var bisectorNormalRight = [x, y];
        dt = t * d2;
        x = v2.x + dt * norm.y * clock;
        y = v2.y - dt * norm.x * clock;
        var bisectorNormalLeft = [x, y];
    } else {
        let x = v2.x + t * (v1.x - v2.x);
        let y = v2.y + t * (v1.y - v2.y);
        bisectorNormalRight = [x, y];
        x = v2.x + t * (v3.x - v2.x);
        y = v2.y + t * (v3.y - v2.y);
        bisectorNormalLeft = [x, y];
    }
    return [bisectorNormalRight, bisectorNormalLeft];
}

export function getBaseLength(points:Coordinate[]) {
    return Math.pow(wholeDistance(points), 0.99);
  }

  export function distance(pnt1:Coordinate, pnt2:Coordinate) {
    return Math.sqrt(
      Math.pow(pnt1[0] - pnt2[0], 2) + Math.pow(pnt1[1] - pnt2[1], 2)
    );
  }

  export function mid(pnt1:Coordinate, pnt2:Coordinate) {
    return [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2];
  }

  export function getQBSplinePoints(points:Coordinate[]) {
    if (points.length <= 2) return points;
  
    var n = 2;
  
    var bSplinePoints = [];
    var m = points.length - n - 1;
    bSplinePoints.push(points[0]);
    for (var i = 0; i <= m; i++) {
      for (var t = 0; t <= 1; t += 0.05) {
        var x = 0;
        var y = 0;
        for (var k = 0; k <= n; k++) {
          var factor = getQuadricBSplineFactor(k, t);
          x += factor * points[i + k][0];
          y += factor * points[i + k][1];
        }
        bSplinePoints.push([x, y]);
      }
    }
    bSplinePoints.push(points[points.length - 1]);
    return bSplinePoints;
  }
  
  export function getQuadricBSplineFactor(k:number, t:number) {
    if (k === 0) return Math.pow(t - 1, 2) / 2;
    if (k === 1) return (-2 * Math.pow(t, 2) + 2 * t + 1) / 2;
    if (k === 2) return Math.pow(t, 2) / 2;
    return 0;
  }
  
  export function getThirdPoint(startPnt:Coordinate, endPnt:Coordinate, angle:number, distance:number, clockWise:boolean) {
    var azimuth = getAzimuth(startPnt, endPnt);
    var alpha = clockWise ? azimuth + angle : azimuth - angle;
    var dx = distance * Math.cos(alpha);
    var dy = distance * Math.sin(alpha);
    return [endPnt[0] + dx, endPnt[1] + dy];
  }

  export function getAzimuth(startPnt:Coordinate, endPnt:Coordinate):number {
    var azimuth=0;
    var angle = Math.asin(
      Math.abs(endPnt[1] - startPnt[1]) / distance(startPnt, endPnt)
    );
    if (endPnt[1] >= startPnt[1] && endPnt[0] >= startPnt[0])
      azimuth = angle + Math.PI;
    else if (endPnt[1] >= startPnt[1] && endPnt[0] < startPnt[0])
      azimuth = Math.PI * 2 - angle;
    else if (endPnt[1] < startPnt[1] && endPnt[0] < startPnt[0]) azimuth = angle;
    else if (endPnt[1] < startPnt[1] && endPnt[0] >= startPnt[0])
      azimuth = Math.PI - angle;
    return azimuth;
  }

  export function wholeDistance(points:Coordinate[]) {
    var n_distance = 0;
    for (var i = 0; i < points.length - 1; i++)
      n_distance += distance(points[i], points[i + 1]);
    return n_distance;
  }

  export function getAngleOfThreePoints(pntA:Coordinate, pntB:Coordinate, pntC:Coordinate) {
    var angle = getAzimuth(pntB, pntA) - getAzimuth(pntB, pntC);
    return angle < 0 ? angle + Math.PI * 2  : angle;
  }

  export function getBezierPoints(points:Coordinate[]) {
    if (points.length <= 2) return points;
  
    var bezierPoints = [];
    var n = points.length - 1;
    for (var t = 0; t <= 1; t += 0.01) {
      var x = 0;
      var y = 0;
      for (var index = 0; index <= n; index++) {
        var factor = getBinomialFactor(n, index);
        var a = Math.pow(t, index);
        var b = Math.pow(1 - t, n - index);
        x += factor * a * b * points[index][0];
        y += factor * a * b * points[index][1];
      }
      bezierPoints.push([x, y]);
    }
    bezierPoints.push(points[n]);
    return bezierPoints;
  }
  
export function getBinomialFactor(n:number, index:number) {
  return getFactorial(n) / (getFactorial(index) * getFactorial(n - index));
}

export function getFactorial(n:number) {
  if (n <= 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 6;
  if (n === 4) return 24;
  if (n === 5) return 120;
  var result = 1;
  for (var i = 1; i <= n; i++) result *= i;
  return result;
}

export function getNormal(pnt1:Coordinate, pnt2:Coordinate, pnt3:Coordinate) {
  var dX1 = pnt1[0] - pnt2[0];
  var dY1 = pnt1[1] - pnt2[1];
  var d1 = Math.sqrt(dX1 * dX1 + dY1 * dY1);
  dX1 /= d1;
  dY1 /= d1;

  var dX2 = pnt3[0] - pnt2[0];
  var dY2 = pnt3[1] - pnt2[1];
  var d2 = Math.sqrt(dX2 * dX2 + dY2 * dY2);
  dX2 /= d2;
  dY2 /= d2;

  var uX = dX1 + dX2;
  var uY = dY1 + dY2;
  return [uX, uY];
}


export function getBisectorNormals(t:number, pnt1:Coordinate, pnt2:Coordinate, pnt3:Coordinate) {
  var normal = getNormal(pnt1, pnt2, pnt3);
  var dist = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
  var uX = normal[0] / dist;
  var uY = normal[1] / dist;
  var d1 = distance(pnt1, pnt2);
  var d2 = distance(pnt2, pnt3);
  if (dist > 0.0001) {
    if (IsClockWise(pnt1, pnt2, pnt3)) {
      var dt = t * d1;
      var x = pnt2[0] - dt * uY;
      var y = pnt2[1] + dt * uX;
      var bisectorNormalRight = [x, y];
      dt = t * d2;
      x = pnt2[0] + dt * uY;
      y = pnt2[1] - dt * uX;
      var bisectorNormalLeft = [x, y];
    } else {
      dt = t * d1;
      x = pnt2[0] + dt * uY;
      y = pnt2[1] - dt * uX;
      bisectorNormalRight = [x, y];
      dt = t * d2;
      x = pnt2[0] - dt * uY;
      y = pnt2[1] + dt * uX;
      bisectorNormalLeft = [x, y];
    }
  } else {
    x = pnt2[0] + t * (pnt1[0] - pnt2[0]);
    y = pnt2[1] + t * (pnt1[1] - pnt2[1]);
    bisectorNormalRight = [x, y];
    x = pnt2[0] + t * (pnt3[0] - pnt2[0]);
    y = pnt2[1] + t * (pnt3[1] - pnt2[1]);
    bisectorNormalLeft = [x, y];
  }
  return [bisectorNormalRight, bisectorNormalLeft];
}

export function getCubicValue(t:number, startPnt:Coordinate, cPnt1:Coordinate, cPnt2:Coordinate, endPnt:Coordinate) {
  t = Math.max(Math.min(t, 1), 0);
  var tp = 1 - t;
  var t2 = t * t;
  var t3 = t2 * t;
  var tp2 = tp * tp;
  var tp3 = tp2 * tp;
  var x =
    tp3 * startPnt[0] +
    3 * tp2 * t * cPnt1[0] +
    3 * tp * t2 * cPnt2[0] +
    t3 * endPnt[0];
  var y =
    tp3 * startPnt[1] +
    3 * tp2 * t * cPnt1[1] +
    3 * tp * t2 * cPnt2[1] +
    t3 * endPnt[1];
  return [x, y];
}