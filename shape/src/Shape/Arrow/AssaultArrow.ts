import { Coordinate } from "ol/coordinate";
import { AssaultArrow } from "../../Calculate/Arrow/AssaultArrow";
import { PolygonShape } from "../Abstractions";

/** 突击箭头 */
export class ShapeAssaultArrow extends PolygonShape {
    tailWidthFactor = 0.15;
    neckWidthFactor = 0.2;
    headWidthFactor = 0.25;
    headAngle = Math.PI / 8.5;
    neckAngle = Math.PI / 13;
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        this.setCoordinates([AssaultArrow([this.First, this.Last], this.tailWidthFactor, this.neckWidthFactor, this.headWidthFactor, this.headAngle, this.neckAngle)]);
    }
}