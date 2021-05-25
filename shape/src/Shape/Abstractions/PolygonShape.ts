import { Coordinate } from "ol/coordinate";
import Polygon from "ol/geom/Polygon";
import { IShape } from "./IShape";

export abstract class PolygonShape extends Polygon implements IShape {
    /** 曲线生成 */
    Params: any;

    /** 图形生成 */
    abstract Generate(): void;

    constructor() {
        super([]);
    }

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
    get First() {
        return this.points[0];
    }
    get Last() {
        return this.points[this.points.length - 1];
    }
}