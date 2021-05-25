import { Coordinate } from "ol/coordinate";

export interface IShape {
    /** 图形参数 */
    Params: any;

    /** 图形生成 */
    Generate(): void;

    /**控制点 */
    Points:Coordinate[];
}