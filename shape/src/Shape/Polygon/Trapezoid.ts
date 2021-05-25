import { Coordinate } from "ol/coordinate";
import { Trapezoid } from "../../Calculate/Polygon/Trapezoid";
import { PolygonShape } from "../Abstractions";
/** 等腰梯形 */
export class ShaprTrapezoid extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points= points;
    }
    Generate(){
        if(this.Points.length<2) return;
        if(this.Points.length===2) this.setCoordinates([[this.First,this.Last]]);
        else this.setCoordinates([Trapezoid(this.First,this.Points[1],this.Last)])
    }
}