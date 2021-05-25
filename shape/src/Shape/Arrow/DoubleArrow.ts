import { DoubleArrow } from '../../Calculate/Arrow/DoubleArrow';
import { PolygonShape } from '../Abstractions';

/** 钳击 */
export class ShapeDoubleArrow extends PolygonShape{
    private headHeightFactor = 0.25;
    private headWidthFactor = 0.3;
    private neckHeightFactor = 0.85;
    private neckWidthFactor = 0.15;

    constructor(points:number[][]){
        super();
        this.Points=points;
    }

    Generate(){
        if(this.Points.length<2) return;
        if(this.Points.length===2) this.setCoordinates([this.Points]);
        else this.setCoordinates([
            DoubleArrow(this.Points,this.headHeightFactor,this.headWidthFactor,this.neckHeightFactor,this.neckWidthFactor)
        ])
    }
}