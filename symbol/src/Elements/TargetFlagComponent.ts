import { css, customElement, html, LitElement, property } from "lit-element";
import { IBannaData } from "../Abstract/IBannaData";
import { IBannaElement } from "../Extension/IBannaElement";

@customElement("target-flag")
export class TargetFlagComponent extends LitElement implements IBannaElement
{
    @property()
    data: IBannaData[]=[];

    @property()
    color:string="#408aff";

    @property()
    name:string="";

    @property()
    dblclcik?:(data:IBannaData)=>void;

    static shadowRootOptions: ShadowRootInit = {mode: 'closed'};

    static styles = css`
    .target-box{
        max-width: 200px;
        min-width: 60px;
        position: relative;
    }
    .target-box .after{
        position: absolute;
        width: 2px;
        height: 50px;
    }
    .target-box .target-item{
        position: relative;
        border-left: 2px solid rgba(46,65,128,.8);
        padding-bottom: 10px;
    }
    .target-box .target-item .content{
        height: 40px;
        padding: 0 10px;
        background: rgba(255,255,255,.6);
        backdrop-filter: blur(5px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
        transition: all 0.3s;
        border: 2px solid rgba(46,65,128,.8);
        border-left: none;;
    }
    .target-box .target-item .content:hover{
        background-color: rgba(200,200,200,.6);
    }
    .flex{
        display:flex;
        align-items:center;
    }
    `;

    
    render() {
        return html`
        <div class="target-box" data-color="${this.color}" style="transform:translateY(${-this.data.length*50 -50}px)">
             ${this.data.map(s=> html`
                 <div class="target-item" @dblclick="${(e:MouseEvent)=>this.dblclcik?.call(this,s)}" style="border-color:${this.color}">
                 <div class="content flex flex-align-center" style="border-color:${this.color}">
                    ${s.name}
                 </div>
                </div>
                 `
             )}
             <div class="after" style="background-color:${this.color}"></div>
        </div>
        `
    }
}