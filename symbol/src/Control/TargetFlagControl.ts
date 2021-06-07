import { Coordinate } from "ol/coordinate";
import { Map } from "ol";
import VectorSource from "ol/source/Vector";
import { BannaControl } from "./BannaControl";
import { IBannaElement } from "../Extension/IBannaElement";

export class TargetFlagControl extends BannaControl {
    protected _component: HTMLElement;
    private _banna: IBannaElement;
    constructor(coordinate: Coordinate,
        map: Map,
        source: VectorSource,
        color: string) {
        super(coordinate, map, source, color);
        this._component = document.createElement("target-flag");
        this._banna = <any> this._component as IBannaElement;
        this._banna.color= color;
        this.Generate();
    }
}