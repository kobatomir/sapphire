import { Vector } from "../Core/Vector";

/** 突击箭头 */
export function AssaultArrow(points: any[], tailWidthFactor: number, neckWidthFactor: number, headWidthFactor: number, headAngle: number, neckAngle: number) {
    let [v1, v2] = Vector.FromSomeArray(points[0],points[1]);
    let point = [
        CreatePoint(v1, v2, Math.PI / 2, tailWidthFactor, false),
        CreatePoint(v2, v1, neckAngle, neckWidthFactor, true),
        CreatePoint(v2, v1, headAngle, headWidthFactor, true),
        v2.ToArray(),
        CreatePoint(v2, v1, headAngle, headWidthFactor, false),
        CreatePoint(v2, v1, neckAngle, neckWidthFactor, false),
        CreatePoint(v1, v2, Math.PI / 2, tailWidthFactor, true)
    ];
    return point;
}

/** 根据V1,v2向量 旋转 长度 创建点
 * @param {number} angle 旋转角度
 * @param {number} factor 长度率
 * @param {boolean} clock 顺时针
 */
 function CreatePoint(
    v1: Vector,
    v2: Vector,
    angle: number,
    factor: number,
    clock?: boolean
  ) {
    angle = clock ? -angle : angle;
    return v2
      .Minus(v1)
      .Rotate(angle).Multiply(factor)
      .Add(v1)
      .ToArray();
  }

