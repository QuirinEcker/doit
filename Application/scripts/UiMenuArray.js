import {UiMenu} from "./UiMenu.js";
import {circleAnimation} from "./index.js";

class UiMenuArray extends Array {

    constructor() {
        super();
    }

    get(name) {
        return this.filter((uiMenu) => {
            return uiMenu.name === name;
        })[0];
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

export {UiMenuArray};