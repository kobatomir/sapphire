import { Coordinate } from "ol/coordinate";
import { Equal } from "../../Calculate/Core/Equal";
import { Ellipse } from "../../Calculate/Polygon/Ellipse";
import { PolygonShape } from "../Abstractions/PolygonShape";

export class ShapeEllipse extends PolygonShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        if (this.Points.length > 2 && !Equal(this.Points[1], this.Last)) this.setCoordinates([Ellipse(this.First,this.Last,  this.Points[1])]);
        else this.setCoordinates([Ellipse(this.First, this.Last)])
    }
}