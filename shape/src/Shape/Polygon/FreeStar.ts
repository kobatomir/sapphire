import { Coordinate } from "ol/coordinate";
import { FreeStar } from "../../Calculate/Polygon/FreeStar";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 自由比例星形 */
export class ShapeFreeStar extends PolygonShape {

    Params: { size: number, rid: number };

    constructor(points: Coordinate[], params: { size: number, rid: number }) {
        super();
        this.Params = params;
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        let points = FreeStar(this.First, this.Last, this.Params.size, this.Params.rid)
        this.setCoordinates([points]);
    }
}