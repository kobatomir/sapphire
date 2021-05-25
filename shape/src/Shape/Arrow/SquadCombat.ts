import { Coordinate } from "ol/coordinate";
import { SquadCombat } from "../../Calculate/Arrow/SquadCombat";
import { ShapeAttackArrow } from "../../Shape/Arrow/AttachArrow";

/** 作战箭头 */
export class ShapeSquadCombat extends ShapeAttackArrow {
    constructor(points: Coordinate[]) {
        super(points);
        this.Points=points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        if (this.Points.length === 2) {
            this.setCoordinates([this.Points]);
        } else
            this.setCoordinates([SquadCombat(this.Points, this.headHeightFactor, this.headWidthFactor, this.neckHeightFactor, this.neckWidthFactor, this.headTailFactor)]);
    }
}