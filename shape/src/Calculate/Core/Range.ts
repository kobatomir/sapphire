/** 范围生成
 * @param start 起始值
 * @param end 结束值：可等于它
 * @param step 步长
 */
export function Range(start:number,end:number,step:number=1):number[]{
   let push=[];
   for(let x= start;x<=end;x+=step) push.push(x);
   return push;
}