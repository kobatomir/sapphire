import { Coordinate } from "ol/coordinate";
import { BezierTwo } from "../../Calculate/Line/Bezier";
import { LineShape } from "../Abstractions/LineShape";

/**二次贝塞尔混和曲线 */
export class ShapeBezier extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }
    Generate() {
        if (this.Points.length < 2) return;
        let push: Coordinate[] = [];
        for (let i = 0; i < this.Points.length; i = i + 2) {
            if (i + 2 < this.Points.length) {
                push = [...push, ...BezierTwo(this.Points[i], this.Points[i + 1], this.Points[i + 2])];
            } else if (i + 1 < this.Points.length) {
                push = [...push, this.Points[i], this.Points[i + 1]]
            }
        }
        this.setCoordinates(push);
    }
}