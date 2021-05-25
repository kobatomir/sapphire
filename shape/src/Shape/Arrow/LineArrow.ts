import { Coordinate } from "ol/coordinate";
import { LineArrow } from "../../Calculate/Arrow/LineArrow";
import { LineShape } from "../Abstractions/LineShape";

/** 折线箭头 -→ */
export class ShapeLinetArrow extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        this.setCoordinates(LineArrow(this.Points));
    }
}