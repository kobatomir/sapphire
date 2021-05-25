import { Coordinate } from "ol/coordinate";
import { Equal } from "../../Calculate/Core/Equal";
import { Arc } from "../../Calculate/Line/Arc";
import { LineShape } from "../Abstractions/LineShape";

export class ShapeArc extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        if (this.Points.length > 2 && !Equal(this.Points[1], this.Last)) this.setCoordinates(Arc(this.First, this.Points[1],this.Last));
        else this.setCoordinates(this.Points)
   
    }
}