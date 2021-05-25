import { Coordinate } from "ol/coordinate";
import { Range} from "../Core/Range"
import { Vector } from "../Core/Vector";

/** 曲线旗帜
 * @param p0 左上点
 * @param p1 右下点
 */
export function ArcFlag(p0:Coordinate,p1:Coordinate):Coordinate[]{
    return FreeArcFlag(p0,p1,10);
}

/** 任意度曲线旗帜构建
 * @param p0 左上角
 * @param p1 右下角
 * @param rid 曲线度
 */
export function FreeArcFlag(p0:Coordinate,p1:Coordinate,rid:number):Coordinate[]{
    let [v0, v1] = Vector.FromSomeArray(p0,p1);
    let y= (v0.y+v1.y)/2;
    let flag = 50;
    let r= (v1.x- v0.x)*0.5/Math.PI;
    let arra= Range(0,flag-1).map(i=>{ 
        let dx = ((2 * Math.PI) / flag) * i;
        let dy = Math.cos(dx + Math.PI / 2);
        return [v0.x + r * dx, ((v0.y - y) / rid) * dy + v0.y]
    })
    let arrb= Range(0,flag-1).map(i=>{ 
        let dx = ((2 * Math.PI) / flag) * i;
        let dy = Math.cos(dx + Math.PI / 2);
        return [v0.x + r * dx, ((v0.y - y) / rid) * dy + y]
    }).reverse();
    return [[v0.x,v1.y],[v0.x,y],...arra,...arrb]
}