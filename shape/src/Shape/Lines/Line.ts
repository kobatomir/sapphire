import { Coordinate } from "ol/coordinate";
import { Vector } from "../../Calculate/Core/Vector";
import { LineShape } from "../Abstractions/LineShape";

/** 折线 */
export class ShapeLine extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        let point = this.Params.close ? [...this.Points, this.Points[0]] : this.Points;
        if(this.Points.length===2){
            let [v0,v1]= Vector.FromSomeArray(this.Points[0],this.Points[1]);
            console.log( v1.Minus(v0).Angle)
        }
        this.setCoordinates(point);
    }
}