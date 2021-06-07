import { IShape, LineShape, PolygonShape, ShapeCreator, ShapeType } from "@violets/shape";
import { Feature, Map, MapBrowserEvent } from "ol";
import { Coordinate } from "ol/coordinate";
import SourceVector from 'ol/source/Vector';
import { EventRecord } from "../Abstract/EventRecord";
import { PointLastEqual } from "../Abstract/PointFunc";
import { ShapeFeature } from "../Abstract/ShapeFeature";


/** 图形绘制 */
export class ShapeDrawer {

    /**依赖承载地图 */
    private map: Map;
    /** 图元存储源 */
    private featureSource: SourceVector;

    constructor(mapinstance: Map, _source: SourceVector) {
        this.map = mapinstance;
        this.featureSource = _source;
    }

    private Points: Coordinate[] = [];

    /**地图事件记录器 */
    private record: EventRecord = new EventRecord();
    /**
     * 激活绘制
     * @param type 
     */
    public Active(type: ShapeType) {
        this.record.Event["click"] = this.map.on('click', e => {
            this.Points.push(e.coordinate);
            let shape: LineShape | PolygonShape = ShapeCreator(this.Points, type, 5);
            let feature = new ShapeFeature(shape);
            this.featureSource.addFeature(feature);
            this.record.Event["dblclick"] = this.map.on('dblclick', () => this.Dispose());
            this.record.Event["pointermove"] = this.map.on("pointermove", e => this.MapPointerMove(e, shape));
            this.record.Event["click"] = this.map.on("click", e => this.MapClick(e, shape));
        });
    }

    /** 鼠标点击事件 */
    private MapClick(e: MapBrowserEvent, shape: IShape) {
        if (PointLastEqual(this.Points, e.coordinate)) return;
        else {
            this.Points.push(e.coordinate);
            shape.Points = this.Points;
        }
    }

    /** 事件注销 */
    private Dispose() {
        this.record.Clear();
        this.Points = [];
    }

    /** 地图鼠标移动事件 */
    private MapPointerMove(e: MapBrowserEvent, shape: IShape) {
        if (PointLastEqual(this.Points, e.coordinate)) return;
        this.Points.push(e.coordinate);
        shape.Points = this.Points;
        this.Points.pop();
    }
}