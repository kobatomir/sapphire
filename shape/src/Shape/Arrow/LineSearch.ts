import { Coordinate } from "ol/coordinate";
import { LineSearch } from "../../Calculate/Arrow/LineSearch";
import { LineShape } from "../Abstractions/LineShape";

/** 折线搜索区 */
export class ShapeLineSearch extends LineShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
        if(this.Points.length<2) return;
        this.setCoordinates(LineSearch(this.Points));
    }
}