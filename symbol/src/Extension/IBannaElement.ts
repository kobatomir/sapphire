import { IBannaData } from "../Abstract/IBannaData";

export interface IBannaElement{
    color:string;
    
    data:IBannaData[];

    dblclcik?:(data:IBannaData)=>void;
}