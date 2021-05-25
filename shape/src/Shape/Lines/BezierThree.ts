import { Coordinate } from "ol/coordinate";
import { BezierTwo } from "../../Calculate/Line/Bezier";
import { BezierThree } from "../../Calculate/Line/BezierThree";
import { LineShape } from "../Abstractions/LineShape";

/**三次贝塞尔混和曲线 */
export class ShapeBezierThree extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }
    Generate() {
        if (this.Points.length < 2) return;
        let push: Coordinate[] = [];
        for (let i = 0; i < this.Points.length; i = i + 3) {
            if (i + 3 < this.Points.length) {
                push = [...push, ...BezierThree(this.Points[i], this.Points[i + 1], this.Points[i + 2], this.Points[i + 3])];
            }
            else if (i + 2 < this.Points.length) {
                push = [...push, ...BezierTwo(this.Points[i], this.Points[i + 1], this.Points[i + 2])];
            } else if (i + 1 < this.Points.length) {
                push = [...push, this.Points[i], this.Points[i + 1]]
            }
        }
        this.setCoordinates(push);
    }
}