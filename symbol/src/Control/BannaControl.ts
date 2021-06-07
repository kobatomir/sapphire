import { Feature, Map, Overlay } from "ol";
import { Coordinate } from "ol/coordinate";
import LineString from "ol/geom/LineString";
import VectorSource from "ol/source/Vector";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { BannaMove } from "../Extension/BannaMove";
import { PointEqual } from "../Extension/PointEqual";

export abstract class BannaControl {
    protected _coordinate: Coordinate;
    protected abstract _component: HTMLElement;
    protected _source: VectorSource;
    protected _map: Map;
    private _line!: Feature;
    protected overlay!: Overlay;
    protected _color: string;
    constructor(coordinate: Coordinate,
        map: Map,
        source: VectorSource,
        color: string) {
        this._coordinate = coordinate;
        this._map = map;
        this._source = source;
        this._color = color;
    }

    protected async Generate() {
        this.overlay = new Overlay({
            element: this._component,
            position: this._coordinate,
            stopEvent: true
        });
        this._map.addOverlay(this.overlay);
        let container = this._map.getViewport().parentElement as HTMLDivElement;
        if (container != null) {
            BannaMove(container, this._component, (l, t) => {
                let coordinate = this._map.getCoordinateFromPixel([l, t]);
                this.overlay.setPosition(coordinate);
                this.DrawLine(coordinate);
            });
        }
    }

    /**绘制图形 */
    protected DrawLine(coordinate: Coordinate) {
        if (PointEqual(coordinate, this._coordinate)) return;
        if (this._line) {
            (this._line.getGeometry() as LineString).setCoordinates([this._coordinate, coordinate]);
        } else {
            let style = new Style({
                stroke: new Stroke({
                    color: this._color,
                    width: 1,
                    lineDash: [10, 5]
                })
            });
            this._line = new Feature(new LineString([this._coordinate, coordinate]));
            this._line.setStyle(style);
            this._source.addFeature(this._line);
        }
    }
}