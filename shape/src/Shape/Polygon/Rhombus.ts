import { Coordinate } from "ol/coordinate";
import { Equal } from "../../Calculate/Core/Equal";
import { Rhombus } from "../../Calculate/Polygon/Rhombus";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 菱形 */
export class ShapeRhombus extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points= points;
    }

    Generate(){
        if (this.Points.length < 2) return;
        if (this.Points.length > 2 && !Equal(this.Points[1], this.Last)) this.setCoordinates([Rhombus(this.First, this.Last, this.Points[1])]);
        else this.setCoordinates([Rhombus(this.First, this.Last)])
    }
}