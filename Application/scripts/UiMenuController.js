import {UiMenu} from "./UiMenu.js";
import {circleAnimation} from "./index.js";

class UiMenuController {

    constructor() {
        this.uiMenus = new Array();
    }

    get(name) {
        return this.uiMenus.filter((uiMenu) => {
            return uiMenu.name === name;
        })[0];
    }

    push(uiMenu) {
        this.uiMenus.push(uiMenu);
    }

    initiateCurrentMenu(name) {
        this.currentMenu = this.get(name)
    }

    switchUiTo(uiMenu) {
        uiMenu.htmlElement.style.display = 'flex';
        this.currentMenu.htmlElement.style.opacity = '0';
        setTimeout(() => {
            this.currentMenu.htmlElement.style.display = 'none';
            uiMenu.htmlElement.style.opacity = '1';
            circleAnimation('black');
            this.currentMenu = uiMenu;
        }, 10)
    }
}

export {UiMenuController};