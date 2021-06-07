import { FeatureEvent } from "../Events/FeatureEvent";
/**
 * Event
 */
export const ShapeDrawerEvents:FeatureEvent[]=[
    {
        name:"移除",
        icon:"fa-bath",
        fun:(f,s)=> s.removeFeature(f)
    }
]