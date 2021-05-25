import { Coordinate } from "ol/coordinate";
import { ParallSearch } from "../../Calculate/Arrow/ParallSearch";
import { LineShape } from "../Abstractions/LineShape";

/** 平行搜索区 */
export class ShapeParallSearch extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        this.setCoordinates(ParallSearch(this.Points));
    }
}