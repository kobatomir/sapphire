import { ResignMenu } from "@violets/core/dist/Feature/Menu";
import { IMenuItem } from "@violets/core/dist/Feature/MenuItem";
import { ShapeFeature } from "../Abstract/ShapeFeature";
import { MapMenuFunc } from "./MapFunc";
import { Map } from "ol"
/**
 * 右键菜单构建器
 */
export class MapRightMenu {
    private _map: Map;
    private _menu: IMenuItem[];
    constructor(map: Map, menu?: IMenuItem[]) {
        this._map = map;
        this._menu = menu || [];
    }


    public RegistryContextMenu() {
        document.oncontextmenu = () => false;
        this._map.getViewport().removeEventListener("contextmenu", this.menuHandler);
        this._map.getViewport().addEventListener("contextmenu", this.menuHandler);
    }

    private menuHandler = async (evt: MouseEvent) => {
        debugger
        let menu: IMenuItem[] = [];
        menu.push({
            name: "提取经纬度",
            action: () => MapMenuFunc.ExtractLngLat(this._map, evt),
            icon: 'fa-bath'
        });

        if (this.HandFeatue(evt, menu)) {
            menu = [...menu, ...this._menu];
        }
        ResignMenu(menu, evt)
    }

    private HandFeatue(evt: MouseEvent, menu: IMenuItem[]) {
        let pixel = this._map.getEventPixel(evt);
        let feature = this._map.getFeaturesAtPixel(pixel);
        if (feature.length > 0) {
            let fea = feature[0] as ShapeFeature;
            if (fea) fea.Event.filter(s => fea.hasListener(s.name))
                .map(s => { return { ...s, action: () => fea.getListeners(s.name)?.forEach((m: any) => m(evt)) } })
                .forEach(s => menu.push(s));
            return false;
        }
        return true;
    }
}