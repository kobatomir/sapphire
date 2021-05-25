import { Coordinate } from "ol/coordinate";
import { Cardinal } from "../../Calculate/Line/Cardinal";
import { LineShape } from "../Abstractions/LineShape";

/**卡尔迪曲线 */
export class ShapeCardinal extends LineShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
        if(this.Points.length<2) return;
        if(this.Points.length>2) this.setCoordinates(Cardinal(this.Points));
        else this.setCoordinates(this.Points);
    }
}