import {circleAnimation} from "./index.js";

class UiMenu {
    constructor(name, htmlElement) {
        this.name = name;
        this.htmlElement = htmlElement;
    }

    switchTo(uiMenu) {
        uiMenu.htmlElement.style.display = 'flex';
        this.htmlElement.style.opacity = '0';
        setTimeout(() => {
            this.htmlElement.style.display = 'none';
            uiMenu.htmlElement.style.opacity = '1';
            circleAnimation('black');
        }, 10)
    }
}

export {UiMenu};