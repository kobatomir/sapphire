import { Coordinate } from "ol/coordinate";
import { GatherPlace } from "../../Calculate/Polygon/GatherPlace";
import { PolygonShape } from "../Abstractions";
/** 集结地  */
export class ShapeGatherPlace extends PolygonShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }

    Generate(){
        if(this.Points.length<2) return;
        this.setCoordinates([GatherPlace(this.Points,0.4)]);
    }
}