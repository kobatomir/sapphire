import { Map, View } from "ol";
import { Tile, Vector } from "ol/layer";
import { XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import SourceVector from 'ol/source/Vector';
import Style from "ol/style/Style";

export module MapAction {
    export function Create(id: string) {

        let xyz = new XYZ({
            url: "http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
        });
        let map = new Map({
            target: id,
            layers: [
                new Tile({
                    source: xyz
                })
            ],
            view: new View({
                center: fromLonLat([37.41, 8.82]),
                zoom: 4
            })
        })

        return map;
    }

    export function CreateLayer(map:Map) {
        let stroke = new Stroke({ color: '#ff0000', width: 1.25 });
        let fill = new Fill({ color: 'rgba(255,0,0,0.2)' });
        let style = new Style({ fill, stroke });
        let featureSource = new SourceVector();
        let drawOverlay = new Vector({ source: featureSource });
       map.addLayer(drawOverlay);
       drawOverlay.setStyle(style);
       return drawOverlay;
    }
}