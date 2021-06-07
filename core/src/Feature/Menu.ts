import { IMenuItem } from "./MenuItem";

export function ResignMenu(menu: IMenuItem[], e: MouseEvent) {
    let div = document.querySelector(".gloabl-menu") as HTMLDivElement;
    if (!div) {
        div = document.createElement("div");
        div.className = "gloabl-menu";
        document.body.appendChild(div);
    }
    div.innerHTML = "";
    menu.forEach(s => {
        let item = document.createElement('div');
        item.className = "menu-item flex flex-align-center";
        item.innerHTML = `<i class="fa ${s.icon}"></i><span>${s.name}</span>`
        item.onmousedown = () => s.action();
        div.appendChild(item);
    })
    let x = (e.pageX + 150) > document.body.offsetWidth ? e.pageX - 150: e.pageX;
    div.style.top = e.pageY + "px";
    div.style.left = x + "px";
    div.className = "gloabl-menu show";
    let click = (ev:MouseEvent) => {
        div.className = "gloabl-menu hide";
        document.body.removeEventListener("mousedown", click);
    }
    document.body.addEventListener("mousedown", click);
}