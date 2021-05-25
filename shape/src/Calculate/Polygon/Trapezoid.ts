import { Coordinate } from "ol/coordinate";
import { Vector } from "../Core/Vector";
/** 等腰梯形 */
export function Trapezoid(p0:Coordinate,p1:Coordinate,control:Coordinate){
   let [v0,v1,vc]= Vector.FromSomeArray(p0,p1,control);
   let r0= v0.Minus(v1);
   let rc= vc.Minus(v1);
   let ceta=  Math.PI- 2* (r0.Angle - rc.Angle);
    let p= rc.Rotate(-ceta).Add(v0).ToArray();
    return [p0,p1,control,p];
}