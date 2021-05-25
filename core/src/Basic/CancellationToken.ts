import { Action } from "../Types/index";

/** 可取消Token */
export class CancellationToken{
    private _isCancel:boolean= false;
    /** 是否被取消 */
    get IsCancel(){
        return this._isCancel;
    }

    /** 取消事件订阅 */
    CancelEvent:Action[]=[];
    
    /** 取消事件 */
    Cancel(){
       this._isCancel=true;
       if(this.CancelEvent.length>0) this.CancelEvent.forEach(s=>s());
    }

}