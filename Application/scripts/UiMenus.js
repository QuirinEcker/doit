import {UiMenu} from "./UiMenu.js";

class UiMenus extends Array {

    constructor() {
        super();
    }

    get(name) {
        return this.filter((uiMenu) => {
            return uiMenu.name === name;
        })[0];
    }
}

export {UiMenus};