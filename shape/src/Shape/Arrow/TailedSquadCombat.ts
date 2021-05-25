import { TailedSquadCombat } from "../../Calculate/Arrow/TailedSquardCombat";
import { PolygonShape } from "../Abstractions";

/**燕尾作战箭头 */
export class ShapeTailedSquadCombat extends PolygonShape {
    constructor(points: any[]) {
        super();
        this.Points = points;
    }
    headHeightFactor = 0.18;
    headWidthFactor = 0.3;
    neckHeightFactor = 0.85;
    neckWidthFactor = 0.15;
    tailWidthFactor = 0.1;
    headTailFactor = 0.8;
    swallowTailFactor = 1;
    Generate() {
        if (this.Points.length < 2) return;
        if (this.Points.length === 2) this.setCoordinates([this.Points]);
        else
            this.setCoordinates([TailedSquadCombat(this.Points, this.headHeightFactor, this.headWidthFactor, this.neckHeightFactor, this.neckWidthFactor, this.tailWidthFactor, this.headTailFactor, this.swallowTailFactor)]);
    }
}