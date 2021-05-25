import { Coordinate } from "ol/coordinate";
import { RegularPolygon } from "../../Calculate/Polygon/RegularPolygon";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 正多边形 */
export class ShapePolygon extends PolygonShape {
    Params: { size: number };
    constructor(points: Coordinate[], params: { size: number }) {
        super();
        this.Params = params;
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        let points = RegularPolygon(this.First, this.Last, this.Params.size);
        this.setCoordinates([points]);
    }
}