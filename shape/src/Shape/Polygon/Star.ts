import { Coordinate } from "ol/coordinate";
import { RegularStar } from "../../Calculate/Polygon/RegularStar";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 星形 */
export class ShapeStar extends PolygonShape {

    Params: { size: number };

    constructor(points: Coordinate[], params: { size: number }) {
        super();
        this.Params = params;
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        let points = RegularStar(this.First, this.Last, this.Params.size || 5)
        this.setCoordinates([points]);
    }
}