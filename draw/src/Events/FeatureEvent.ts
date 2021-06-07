import SourceVector from 'ol/source/Vector';
import { ShapeFeature } from '../Abstract/ShapeFeature';
/** 图形自定义事件 */
export interface FeatureEvent {
    icon: string,
    name: string,
    fun: (featrue: ShapeFeature,source:SourceVector) => void
}