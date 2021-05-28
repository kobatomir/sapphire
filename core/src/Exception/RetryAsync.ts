import { Func } from "../Types";
import { RetryFunc } from "./Retry";

/**
 * 异步重试
 * @param fn  方法
 * @param maxRetry 
 */
 export async function RetryAsync<T>(fn: () => T, maxRetry: number): Promise<T>;
 /**
  * 异步重试
  * @param fn  方法
  * @param maxRetry 
  */
 export async function RetryAsync(fn: () => any, maxRetry: number): Promise<any>;
 /**
  * 异步重试
  * @param fn  方法
  * @param maxRetry 
  */
 export async function RetryAsync<T>(fn: () => T, maxRetry: number, handler: (e: Error) => any): Promise<T>;
 /**
  * 异步重试
  * @param fn  方法
  * @param maxRetry 
  */
 export async function RetryAsync(fn: () => any, maxRetry: number, handler: (e: Error) => any): Promise<any>;
 /**
  * 异步重试
  * @param fn  方法
  * @param maxRetry 
  */
 export async function RetryAsync(fn: any, maxRetry: number, handler?: (e: Error) => any): Promise<any> {
 
     try {
         return await RetryFunc(fn, [], maxRetry);
     } catch (e) {
         if (handler) return await handler(e);
         return null;
     }
 }