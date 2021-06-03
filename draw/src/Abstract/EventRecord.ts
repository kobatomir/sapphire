import { EventsKey } from "ol/events";

/**事件记录器 */
export class EventRecord {

    /** 事件记录器     */
    public Event: { [key: string]: EventsKey };
    constructor() {
        this.Event = new Proxy({}, {
            set: (target: any, key: string, value: EventsKey | null): boolean => {
                this.Unrecord(key);
                if (value != null) { target[key] = value; }
                return true;
            }
        });
    }

    /** 手动取消事件：无需判断事件是否存在 */
    public Unrecord(key: string) {
        if (this.Event[key]) {
            let target = this.Event[key];
            target.target.removeEventListener(target.type, target.listener);
            delete this.Event[key];
        }
    }
    /** 清除所有事件 */
    public Clear() {
        let keys = Object.keys(this.Event);
        keys.forEach(s => this.Unrecord(s));
    }

}