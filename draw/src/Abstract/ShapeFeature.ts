import { LineShape, PolygonShape } from "@violets/shape";
import { Feature } from "ol";
import Geometry from "ol/geom/Geometry";
import { CancellationToken }  from "@violets/core"

export class ShapeFeature<GeomType extends Geometry = Geometry> extends Feature<GeomType>{

    Event: { name: string, icon: string }[] = [];

    get Geometry():LineShape|PolygonShape{
        let geo= this.getGeometry() as any;
        return  geo as LineShape|PolygonShape;
    }

    /** 可取消动画Token */
    Token?:CancellationToken;
}