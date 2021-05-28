import { ShapeType } from "./ShapeType";
/** 图形名称类型 */
export type ShapeName={
    index:number,
    name:string
};

/** 静态图形名称 */
export const ShapeNames:ShapeName[] = [
    { index: <number>ShapeType.Arc , name: "圆弧线" },
    { index: <number>ShapeType.Bezier , name: "二次贝塞尔" },
    { index: <number>ShapeType.BezierSegment , name: "二次贝塞尔线段" },
    { index: <number>ShapeType.BezierThree , name: "三次贝塞尔" },
    { index: <number>ShapeType.BezierSegmentThree , name: "三次贝塞尔线段" },
    { index: <number>ShapeType.Cardinal , name: "卡迪尔曲线" },
    { index: <number>ShapeType.Line , name: "折线" },
    { index: <number>ShapeType.Circle , name: "圆" },
    { index: <number>ShapeType.Ellipse , name: "椭圆" },
    { index: <number>ShapeType.FreePolygon , name: "多边形" },
    { index: <number>ShapeType.FreeStar , name: "自由星形" },
    { index: <number>ShapeType.GatherPlace , name: "集结地" },
    { index: <number>ShapeType.Lune , name: "弓形" },
    { index: <number>ShapeType.Polygon , name: "正多边形" },
    { index: <number>ShapeType.Rectangle , name: "矩形" },
    { index: <number>ShapeType.Rhomboid , name: "平行四边形" },
    { index: <number>ShapeType.Sector , name: "扇形" },
    { index: <number>ShapeType.Star , name: "星形" },
    { index: <number>ShapeType.Trapezoid , name: "等腰梯形" },
    { index: <number>ShapeType.Rhombus , name: "菱形" },
    { index: <number>ShapeType.Surface , name: "曲面" },
    { index: <number>ShapeType.ArcFlag , name: "曲线旗帜" },
    { index: <number>ShapeType.RectangleFlag, name: "矩形旗帜" },
    { index: <number>ShapeType.TriangleFlag , name: "三角旗帜" },
    { index: <number>ShapeType.AssaultArrow , name: "突击箭头" },
    { index: <number>ShapeType.AssaultDirection , name: "突击方向" },
    { index: <number>ShapeType.AttachArrow , name: "进攻箭头" },
    { index: <number>ShapeType.TailedAttackArrow , name: "燕尾进攻箭头" },
    { index: <number>ShapeType.SquadCombat , name: "作战箭头" },
    { index: <number>ShapeType.TailedSquadCombat , name: "燕尾作战箭头" },
    { index: <number>ShapeType.DoubleArrow , name: "钳击" },
    { index: <number>ShapeType.CardinalArrow , name: "卡尔迪箭头" },
    { index: <number>ShapeType.LineArrow , name: "折线箭头" },
    { index: <number>ShapeType.LineSearch , name: "折线搜索区" },
    { index: <number>ShapeType.ParallSearch , name: "平行搜索区" },
    { index: <number>ShapeType.SectorSearch , name: "扇形搜索区" },
    { index: <number>ShapeType.StraightArrow , name: "直线箭头" },
]