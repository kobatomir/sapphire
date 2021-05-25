import { Coordinate } from "ol/coordinate";
import { RectangleFlag } from "../../Calculate/Flag/RectangleFlag";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 矩形旗帜 */
export class ShapeRectangleFlag extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
        if(this.Points.length<2) return;
        this.setCoordinates([RectangleFlag(this.First,this.Last)]);
    }
}