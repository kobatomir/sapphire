import { Coordinate } from "ol/coordinate";
import { Rectangle } from "../../Calculate/Polygon/Rectangle";
import { PolygonShape } from "../Abstractions";

export class ShapeRectangle extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
        if(this.Points.length<2) return;
        this.setCoordinates([Rectangle(this.Points)]);
    }
}