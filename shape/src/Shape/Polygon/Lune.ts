import { Coordinate } from "ol/coordinate";
import { Lune } from "../../Calculate/Polygon/Lune";
import { PolygonShape } from "../Abstractions";
/** 弓形 */
export class ShapeLune extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }

    Generate(){
        if (this.Points.length < 2) return;
       if(this.Points.length===2) this.setCoordinates([Lune(this.First,this.Last)]);
       else this.setCoordinates([Lune(this.First,this.Points[1],this.Last)])
    }
}