import { Coordinate } from "ol/coordinate";
import { Circle } from "../../Calculate/Polygon/Circle";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 圆形 */
export class ShapeCircle extends PolygonShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        let points = Circle(this.First, this.Last);
        this.setCoordinates([points]);
    }
}