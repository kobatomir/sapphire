import { Map } from "ol";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import { IBannaData } from "../Abstract/IBannaData";
import { Color, Lonlat } from "../Abstract/Types";
import { TargetFlagControl } from "../Control";
import { IMenuItem, ResignMenu } from "@violets/core/dist/Feature";
import { } from "@violets/core/dist/Extend"
import { Coordinate } from "ol/coordinate";
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
     * 使用经纬度创建旗帜
     * @param lonlat 经纬度
     * @param data  数据
     */
    CreateTargetFromLonlat(lonlat: Lonlat, ...data: IBannaData[]): TargetFlagControl {
        let coordinate = fromLonLat(lonlat);
        return this.CreateTarget(coordinate,...data);
    }

    /**
    * 创建旗帜
    * @param lonlat 经纬度
    * @param data  数据集合
    */
    CreateTarget(coordinate: Coordinate, ...data: IBannaData[]): TargetFlagControl {
        let control = new TargetFlagControl(coordinate, this._map, this._source, this.ColorSelect(data[0]), data);
        control._banna.contexthand = (_data: IBannaData, e: MouseEvent) => this.contextHand(control, _data, e);
        return control;
    }

    protected abstract MenuContext: IMenuItem[] = [];

    private contextHand(control: TargetFlagControl, data: IBannaData, e: MouseEvent) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        let menus: IMenuItem[] = [];
        menus.push({
            icon: "fa-times",
            name: "移除",
            action: () => control.Data.length > 1 ? control.Data = control.Data.Delete(data) : control.Destory()
        })
        if (control.Data.length > 1) {
            menus.push({
                icon: "fa-share",
                name: "分离",
                action: () => {
                    control.Data = control.Data.Delete(data);
                    this.CreateTarget(control._coordinate, data);
                }
            })
        }
        menus = [...menus, ...this.MenuContext];
        console.log(menus);
        ResignMenu(menus, e);
    }
}