import { Coordinate } from "ol/coordinate";
import { AttrackArrow } from "../../Calculate/Arrow/AttackArrow";
import { PolygonShape } from "../Abstractions/PolygonShape";

/** 进攻箭头 */
export class ShapeAttackArrow extends PolygonShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    headHeightFactor = 0.18;
    headWidthFactor = 0.3;
    neckHeightFactor = 0.85;
    neckWidthFactor = 0.15;
    headTailFactor = 0.8;

    Generate() {
        if (this.Points.length < 2) return;
        if (this.Points.length === 2) { this.setCoordinates([this.Points]); } else
            this.setCoordinates([AttrackArrow(this.Points, this.headHeightFactor, this.headWidthFactor, this.neckHeightFactor, this.neckWidthFactor, this.headTailFactor)]);
    }
}