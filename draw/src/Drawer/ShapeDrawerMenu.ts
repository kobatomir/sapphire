import SourceVector from 'ol/source/Vector';
import { ShapeFeature } from '../Abstract/ShapeFeature';
import { FeatureEvent } from "../Events/FeatureEvent";

/** 设置右键 */
export function SetRightMenu(feature: ShapeFeature, source: SourceVector, actions: FeatureEvent[]) {
    actions.forEach(s => {
        feature.Event.push({ name: s.name, icon: s.icon });
        feature.addEventListener(s.name, () => {
            s.fun(feature, source);
            return true;
        });
    })
}