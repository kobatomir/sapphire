/**
 * 异步异常处理
 * @param fn 方法
 */
 export async function TryCatchAsync(fn: () => any): Promise<any>;
 /**
  * 异步异常处理
  * @param fn 方法
  * @argument T 最终期望数据类型 
  */
 export async function TryCatchAsync<T>(fn: () => any): Promise<T>;
 
 /**
  * 异步异常处理
  * @param fn 方法
  */
 export async function TryCatchAsync(fn: () => any, error: (e: Error) => any): Promise<any>;
 /**
  * 异步异常处理
  * @param fn 方法
  * @argument T 最终期望数据类型 
  */
 export async function TryCatchAsync<T>(fn: () => any, error: (e: Error) => any): Promise<T>;
 /**
  * 异步异常处理:一定返回Promise
  * @param fn 
  */
 export async function TryCatchAsync(fn: () => any, error?: (e: Error) => any): Promise<any> {
     try {
         return await fn();
     } catch (e) {
         if (error) { return await error(e); }
         return null;
     }
 }