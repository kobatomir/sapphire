import { Map} from "ol"
import { toLonLat } from "ol/proj";
import { CopyTextToClipboard } from "@violets/core/dist/Feature"
export module MapMenuFunc{
    export function ExtractLngLat(map:Map,e:any) {
        let coordinate = map.getCoordinateFromPixel([e.layerX, e.layerY]);
        let data=e.ctrlKey?coordinate: toLonLat(coordinate);
        if(e.ctrlKey){
            console.log("提取经纬度时使用了Ctrl,复制为WebMeric坐标");
        }
        let text= `${data[0]},${data[1]}`;
        CopyTextToClipboard(text);
    }
}