import { Coordinate } from "ol/coordinate";
import { StraightArrow } from "../../Calculate/Arrow/StraightArrow";
import { LineShape } from "../Abstractions/LineShape";

/** 直线箭头 → */
export class ShapeStraightArrow extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        this.setCoordinates(StraightArrow(this.First, this.Last));
    }
}