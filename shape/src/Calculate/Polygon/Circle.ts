import { Vector } from "../Core/Vector";
import {Range} from "../Core/Range"
import { Coordinate } from "ol/coordinate";

/** 圆形构建器
 * @param center 中心点
 * @param control 控制点
 */
export function Circle(center:Coordinate,control:Coordinate){
  let [vcenter,vcontrol] = Vector.FromSomeArray(center,control);
  let num=60;
  let push= Range(0,num-1).map(i=>vcontrol.RotateFrom(vcenter,2*i*Math.PI/num).ToArray());
  push.push(push[0]);
  return push;
}