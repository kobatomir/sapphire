import { Coordinate } from "ol/coordinate";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 自由多边形 */
export class ShapeFreePolygon extends PolygonShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }
    Generate() {
        if (this.Points.length < 2) return;
        this.setCoordinates([this.Points]);
    }
}