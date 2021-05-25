import { Coordinate } from "ol/coordinate";
import { BezierTwo } from "../../Calculate/Line/Bezier";
import { BezierThree } from "../../Calculate/Line/BezierThree";
import { LineShape } from "../Abstractions/LineShape";

/** 三次贝塞尔线段 */
export class ShapeBezierThreeSegment extends LineShape {

    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        if (this.Points.length === 2) this.setCoordinates(this.Points);
        else if (this.Points.length === 3) this.setCoordinates(BezierTwo(this.First, this.Points[1], this.Last));
        else this.setCoordinates(BezierThree(this.First, this.Points[1], this.Points[2], this.Last));
    }
}