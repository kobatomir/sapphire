import { Coordinate } from "ol/coordinate";
import { TriangleFlag } from "../../Calculate/Flag/TriangleFlag";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 三角旗帜 */
export class ShapeTriangleFlag extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
        if(this.Points.length<2) return;
        this.setCoordinates([TriangleFlag(this.First,this.Last)]);
    }
}