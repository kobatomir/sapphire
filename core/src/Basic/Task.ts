import { CancellationToken } from "./CancellationToken";
import { Action, Func } from "../Types/index";

/** Promise 辅助创建类 */
export module Task{

    /**等待时长
     * @param millisecondDelay 等待的时间：毫秒
     * @param cancelToken 取消token
     */
    export function Delay(millisecondDelay:number,cancelToken:CancellationToken):Promise<void>;
    /**等待毫秒时常
     *  @param millisecondDelay 等待的时间：毫秒
     */
    export function Delay(millisecondDelay:number):Promise<void>;
    export function Delay(millisecondDelay:number,cancelToken?:CancellationToken):Promise<void>
    {
        return new  Promise(r=>{
            setTimeout(() => r(), millisecondDelay);
            if(cancelToken){
                cancelToken.CancelEvent.push(()=> r());
            }
        })
    }
    
    /** 从结果中返回数据
     * @param data 要返回的数据
     */
    export function FromResult<T>(data:T):Promise<T>{
        return new Promise(r=>r(data));
    }
    /** 返回空任务     */
     export function CompletedTask():Promise<void>{
        return new Promise(r=>r());
    }
    /** 开始一个新任务,无返回值 */
    export function Run(action:Action):Promise<void>;
    /** 开始一个新任务,返回 @type {T} */
    export function Run<T>(action:Func<T>):Promise<T>;
    export function Run(action:any):Promise<any>{
        return new Promise(r=>{
            let data = action();
            r(data);
        })
    }

    /** 等待所有任务完成
     * @param promise 任务集合
     */
    export function WaitAll(...promise:Promise<any>[]){
        return Promise.all(promise);
    }
}