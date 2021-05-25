import { Coordinate } from "ol/coordinate";
import { ArcFlag } from "../../Calculate/Flag/ArcFlag";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 曲线旗帜 */
export class ShapeAcrFlag extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
        if(this.Points.length<2) return;
        this.setCoordinates([ArcFlag(this.First,this.Last)]);
    }
}