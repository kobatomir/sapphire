import { Coordinate } from "ol/coordinate";
import { Equal } from "../../Calculate/Core/Equal";
import { Sector } from "../../Calculate/Polygon/Sector";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 扇形 */
export class ShapeSector extends PolygonShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        if (this.Points.length > 2 && !Equal(this.Points[1], this.Last)) this.setCoordinates([Sector(this.First,  this.Points[1],this.Last)]);
        else this.setCoordinates([this.Points])
    }
}