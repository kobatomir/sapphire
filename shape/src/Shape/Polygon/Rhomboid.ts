import { Coordinate } from "ol/coordinate";
import { Rhomboid } from "../../Calculate/Polygon/Rhomboid";
import { PolygonShape } from "../Abstractions";
/** 平行四边形 */
export class ShapeRhomboid extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
        if(this.Points.length<2) return;
        if(this.Points.length===2) this.setCoordinates([[this.First,this.Last]]);
        else this.setCoordinates([Rhomboid(this.First,this.Points[1],this.Last)])
   
    }
}