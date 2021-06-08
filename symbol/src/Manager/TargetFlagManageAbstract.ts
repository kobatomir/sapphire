import { Map } from "ol";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { IBannaData } from "../Abstract/IBannaData";
import { Color, Lonlat } from "../Abstract/Types";
import { TargetFlagControl } from "../Control";
import { IMenuItem, ResignMenu } from "@violets/core/dist/Feature";
import { } from "@violets/core/dist/Extend"
export abstract class TargetFlagManageAbstract {

    protected _map: Map;
    protected _source: VectorSource;

    constructor(map: Map, source: VectorSource) {
        this._map = map;
        this._source = source;
    }

    /** 颜色定义器 */
    protected abstract ColorSelect(data: IBannaData): Color;

    /**
     * 创建单个旗帜
     * @param lonlat 经纬度
     * @param data  数据
     */
    CreateTarget(lonlat: Lonlat, data: IBannaData): TargetFlagControl {
        let coordinate = fromLonLat(lonlat);
        let control = new TargetFlagControl(coordinate, this._map, this._source, this.ColorSelect(data), [data]);
        control._banna.contexthand = (_data: IBannaData, e: MouseEvent) => this.contextHand(control, _data, e);
        return control;
    }

    protected abstract MenuContext: IMenuItem[] = [];

    private contextHand(control: TargetFlagControl, data: IBannaData, e: MouseEvent) {
        let menus: IMenuItem[] = [];
        menus.push({
            icon: "remove",
            name: "移除",
            action: () => control.Data.length > 1 ? control.Data = control.Data.Delete(data) : control.Destory()
        })

        menus = [...menus,...this.MenuContext];
        ResignMenu(menus,e);
    }
}