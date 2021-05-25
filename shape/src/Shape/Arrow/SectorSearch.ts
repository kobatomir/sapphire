import { Coordinate } from "ol/coordinate";
import { SectorSearch } from "../../Calculate/Arrow/SectorSearch";
import { LineShape } from "../Abstractions/LineShape";

/** 扇形搜索区 */
export class ShapeSectorSearch extends LineShape {
    constructor(points: Coordinate[]) {
        super();
        this.Points = points;
    }

    Generate() {
        if (this.Points.length < 2) return;
        this.setCoordinates(SectorSearch(this.First,this.Last));
    }
}