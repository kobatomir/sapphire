/**
 * 异常捕获装饰器
 * @param errorhandler 异常处理方法
 */
export function Catch(errorhandler: Function): MethodDecorator;
/**
 * 异常捕获装饰器
 * @param writeToConsole  是否记录错误到控制台
 */
export function Catch(writeToConsole: boolean): MethodDecorator;
export function Catch(param: any): MethodDecorator {
    return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        const originFunc: Function = descriptor.value;
        descriptor.value = function (...args: any[]) {
            try {
                let promise = originFunc.apply(this, args);
                if (promise instanceof Promise) {
                    return promise.catch(e => Log(e, target, propertyKey, param));
                }
                return promise;
            } catch (e) {
                return Log(e, target, propertyKey, param);
            }
        }
    }
}

function Log(this: any, e: any, target: any, propertyKey: any, param: any) {
    if (typeof(param)==="boolean") {
        if (param) {
            console.log(`${target.constructor.name}的方法${target}抛出错误:`, e);
        }
    } else if (param instanceof Function) {
        let fn: Function = param;
        return fn.apply(this, [e, this])
    }
}

/** 捕获异常并在控制台输出 */
export const Catched = Catch(true);