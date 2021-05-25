import { Coordinate } from "ol/coordinate";
import { Surface } from "../../Calculate/Polygon/Surface";
import { LineShape } from "../Abstractions";
/**曲面 */
export class ShapeSurface extends LineShape{
    constructor(points:Coordinate[]){
        super();
        this.Points=points;
    }
    Generate(){
            if(this.Points.length<2) return;
            if(this.Points.length===2) this.setCoordinates([this.First,this.Last]);
            else this.setCoordinates(Surface(this.Points))
    }
}