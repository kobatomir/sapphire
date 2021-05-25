import { Coordinate } from "ol/coordinate";
import { BezierTwo } from "../../Calculate/Line/Bezier";
import { LineShape } from "../Abstractions/LineShape";

/** 二次贝塞尔线段 */
export class ShapeBezierSegment extends LineShape{

    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }
    Generate() {
        if (this.Points.length < 2) return;
        if(this.Points.length>2) this.setCoordinates(BezierTwo(this.First,this.Points[1],this.Last));
        else this.setCoordinates(this.Points);
    }
}