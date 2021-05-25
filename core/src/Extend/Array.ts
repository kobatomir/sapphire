import { Predicate } from "../Types/index";

declare global {
    interface Array<T> {

       /** 真实删除数据 */
       Delete(element: T): Array<T>;
       
       /** 真实删除一组数据 */
       DeleteRange(array:Array<T>):Array<T>;

       /** 条件删除 */
       DeleteWhere(pre:Predicate<T>):Array<T>;
    }
  }
  
  if (!Array.prototype.Delete) {
    Array.prototype.Delete = function<T>(this: T[], element: T): T[] {
         let index= this.indexOf(element);
         if(index>-1) this.splice(index,1);
         return this;
    }
  }
  if (!Array.prototype.DeleteRange) {
    Array.prototype.Delete = function<T>(this: T[], array: T[]): T[] {
         array.forEach(s=> this.Delete(s));
         return this;
    }
  }
  if (!Array.prototype.DeleteWhere) {
    Array.prototype.Delete = function<T>(this: T[], pre: Predicate<T>): T[] {
          this.filter(s=>pre(s)).forEach(s=>this.Delete(s));
          return this;
    }
  }
 
  export {}