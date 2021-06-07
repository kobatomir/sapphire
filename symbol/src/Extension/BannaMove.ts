/**
 * 
 * @param container 地图容器
 * @param div flag元素
 * @param func 回调
 */
export function BannaMove(container: HTMLElement, div: HTMLElement, func: (left: number, top: number) => void) {
    let source: MouseEvent;
    let mousemove = (evt: MouseEvent) => {
        let left = evt.clientX - container.offsetLeft - source.offsetX;
        let top = evt.clientY - container.offsetTop - source.offsetY;
        if (func) func(left, top);
    }
    let mouseup = () => {
        div.removeEventListener("mousedown", mousedown);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
    }
    let mousedown = (e: MouseEvent) => {
        source = e;
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    };
    mouseup();
    div.addEventListener("mousedown", mousedown);
}

