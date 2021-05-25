import { ShapeAssaultArrow } from "./AssaultArrow";

/** 突击方向 */
export class ShapeAssaultDirection extends ShapeAssaultArrow {

    tailWidthFactor = 0.2;
    neckWidthFactor = 0.25;
    headWidthFactor = 0.3;
    headAngle = Math.PI / 4;
    neckAngle = Math.PI * 0.17741;
    constructor(points: any[]) {
      super(points);
      this.Points=points;
    }
}