import { Coordinate } from "ol/coordinate";
import { FreeStar } from "./FreeStar";

/** 正多边星形创建器
 *  @param center 中心点
 *  @param control 控制点
 *  @param size 边数
 */
export function RegularStar(center: Coordinate, control: Coordinate, size: number) {
    size = size || 5;
    let ceta = (2 * Math.PI) / size;
    let cetaa = ceta / 4;
    let cetac = Math.PI - cetaa - 2 * cetaa;
    let rid = Math.sin(cetaa) / Math.sin(cetac);
    return FreeStar(center, control, size, rid);
}