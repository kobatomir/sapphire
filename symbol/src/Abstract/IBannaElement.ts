import { IBannaData } from "./IBannaData";

export interface IBannaElement{
    color:string;
    
    data:IBannaData[];

    dblclickhand?:(data:IBannaData)=>void;

    contexthand?:(data:IBannaData,e:MouseEvent)=>void;
}