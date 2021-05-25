import { Coordinate } from "ol/coordinate";
import { CardinalArrow } from "../../Calculate/Arrow/CardinalArrow";
import { LineShape } from "../Abstractions/LineShape";

/** 卡尔迪曲线箭头 */
export class ShapeCardinalArrow extends  LineShape{
    constructor(points:Coordinate[]){
        super();
        this.Points= points;
    }

    Generate(){
        if(this.Points.length<2) return;
        this.setCoordinates(CardinalArrow(this.Points));
    }
}