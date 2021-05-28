import { MaxRetryError, RetryFunc } from "./Retry";
/**
 * 重试装饰器
 * @param maxRetry 最大重试次数
 * @param handler 异常处理
 */
export function Retryable(maxRetry: number, handler: Function): MethodDecorator;
/**
 * 重试装饰器
 * @param maxRetry 最大重试次数
 * @param canThrow 是否抛出异常
 */
export function Retryable(maxRetry: number, canThrow: boolean): MethodDecorator;
export function Retryable(maxRetry: number, param: any): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        const originFunc: Function = descriptor.value;
        if (originFunc.constructor.name === 'AsyncFunction') {
            descriptor.value = async function (...args: any[]) {
                try {
                    return await RetryFunc.apply(this, [originFunc, args, maxRetry]);
                } catch (e) {
                    return await HandleError(e, target, propertyKey, param)
                }
            }
        } else {
            descriptor.value = function (...args: any[]) {
                try {
                    return RetryFunc.apply(this, [originFunc, args, maxRetry]);
                } catch (e) {
                    return HandleError(e, target, propertyKey, param)
                }
            }
        }
    }
}

function HandleError(this: any, e: any, target: any, propertyKey: any, param: any) {
    if (typeof (param) === "boolean") {
        if (param) {
            let str = `${target.constructor.name}的${propertyKey}超出重试次数`;
            throw new MaxRetryError(str)
        }
    } else if (param instanceof Function) {
        let fn: Function = param;
        return fn.apply(this, [e, this])
    }
}