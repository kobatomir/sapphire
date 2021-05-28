import { ErrorAction } from "../Types";

/**
 * 异常处理
 * @param fn 同步方法
 *  @description 当fn为异步方法时，返回Promise
 */
export function TryCatch(fn: () => any): any;
/**
 * 异常处理
 * @param fn 同步方法
 * @param error 异常处理
 * @description 当fn为异步方法时，返回Promise
 */
export function TryCatch(fn: () => any, error: (e: Error) => any): any;
/**
 * 异常处理
 * @param fn 同步方法
 * @argument T 期望返回类型
 * @description 当fn为异步方法时，返回 Promise
 */
export function TryCatch<T>(fn: () => T): T;
/**
 * 异常处理
 * @param fn 同步方法
 * @param error 错误处理
 * @argument T 期望返回类型
 * @description 当fn为异步方法时，返回 Promise
 * 
 */
export function TryCatch<T>(fn: () => T, error: ErrorAction): T;
export function TryCatch(fn: () => any, error?: ErrorAction): any {
    try {
        let promise = fn();
        if (promise instanceof Promise) {
            return promise.catch(e => CatchHandler(e, error))
        }
        return promise;
    } catch (e) {
        CatchHandler(error, e);
    }
}


function CatchHandler(e: any, error?: ErrorAction) {
    if (error) {
        return error(e);
    }
    return null;
}