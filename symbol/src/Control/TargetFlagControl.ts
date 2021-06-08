import { Coordinate } from "ol/coordinate";
import { Map } from "ol";
import VectorSource from "ol/source/Vector";
import { BannaControl } from "./BannaControl";
import { IBannaElement } from "../Abstract/IBannaElement";
import { IBannaData } from "../Abstract/IBannaData";

export class TargetFlagControl extends BannaControl {
    protected _component: HTMLElement;
    public _banna: IBannaElement;
    constructor(coordinate: Coordinate,
        map: Map,
        source: VectorSource,
        color: string,
        data:IBannaData[]
        ) {
        super(coordinate, map, source, color);
        this._component = document.createElement("target-flag");
        this._banna = <any> this._component as IBannaElement;
        this._banna.color= color;
        this._banna.data= data;
        this.Generate();
    }

    set Data(value:IBannaData[]){
        this._banna.data=value;
    }

    get Data(){
        return this._banna.data;
    }
}