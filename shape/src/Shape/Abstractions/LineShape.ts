import { Coordinate } from "ol/coordinate";
import LineString from "ol/geom/LineString";
import { IShape } from "./IShape";

export abstract class LineShape extends LineString implements IShape {

    /** 曲线生成 */
    Params: { close: boolean } = { close: false };

    /** 图形生成 */
    abstract Generate(): void;


    /** 控制点 */
    private points: Coordinate[] = [];

    /** 关键点 */
    get Points(): Coordinate[] {
        return this.points;
    }

    set Points(value: Coordinate[]) {
        this.points = value;
        if (this.points.length >= 1) this.Generate();
    }

    constructor() {
        super([]);
    }
    get First() {
        return this.points[0];
    }
    get Last() {
        return this.points[this.points.length - 1];
    }

}