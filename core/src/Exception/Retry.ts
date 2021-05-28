import { TryCatch } from "./TryCache";

/** 超出最大重试次数 */
export class MaxRetryError extends Error {
    code="maxRetry";
 }
/** 重试抽象方法 */
export function RetryFunc(this: any, func: Function, args: any[], max: number): any {
    try {
        let promise = func.apply(this, args);
        if (promise instanceof Promise) {
            return promise.catch(e => {
                if (--max < 0) throw new MaxRetryError();
                return RetryFunc.apply(this, [func, args, max])
            });
        }
        return promise;
    } catch (e) {
        if (--max < 0) throw new MaxRetryError("超出最大重试数量");
        return RetryFunc.apply(this, [func, args, max])
    }
}

/**
 * 重试
 * @param fn  方法
 * @param maxRetry 最大重试次数
 * @argument T 期望类型
 */
 export function Retry<T>(fn: () => T, maxRetry: number): T;
 /**
  * 重试
  * @param fn  方法
  * @param maxRetry 最大重试数
  */
 export function Retry(fn: () => any, maxRetry: number): any;
 /**
  * 重试
  * @param fn  方法
  * @param maxRetry 最大重试数量
  * @param handler 异常处理
  */
 export function Retry<T>(fn: () => T, maxRetry: number, handler: (e: Error) => any): T;
 /**
  * 重试
  * @param fn  方法
  * @param maxRetry 
  * @param handler 异常处理
  */
 export function Retry(fn: () => any, maxRetry: number, handler: (e: Error) => any): any;
 /**
  * 重试
  * @param fn  方法
  * @param maxRetry
  * @param handler
  */
 export function Retry(fn: any, maxRetry: number, handler?: (e: Error) => any): any {
     return TryCatch(() => RetryFunc(fn, [], maxRetry), e => {
         if (handler) return handler(e);
         return null;
     })
 }
 