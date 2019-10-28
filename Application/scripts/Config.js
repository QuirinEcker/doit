import {UiMenu} from "./UiMenu.js";
import {UiMenuController} from "./UiMenuController.js";
import {ActionController} from "./ActionController.js";
import {DataBase} from "./DataBase.js"
import {KeyWordCategory} from "./KeyWordCategory.js";

class Config {
    static load() {
        this.initialUiMenus();
        this.initialKeyWordCategories()
    }

    static initialUiMenus() {
        this.uiMenuController.push(new UiMenu('main', document.querySelector('main')));
        this.uiMenuController.push(new UiMenu('home', document.querySelector('#home')));
        this.uiMenuController.push(new UiMenu('login', document.querySelector('#login')));
        this.uiMenuController.push(new UiMenu('settings', document.querySelector('#settings')));
        this.uiMenuController.push(new UiMenu('signup', document.querySelector('#signup-menu')));

        this.uiMenuController.initiateCurrentMenu('login');
    }

    static initialKeyWordCategories() {
        this.keyWordCategories.push(new KeyWordCategory('tag', '#'));
        this.keyWordCategories.push(new KeyWordCategory('at', '@'));
    }
}

Config.uiMenuController = new UiMenuController();
Config.actionController = new ActionController();
Config.keyWordCategories = [];
Config.dataBase = new DataBase("omsdoifm");

let uiMenuController = Config.uiMenuController;
let dataBase = Config.dataBase;
let keyWordCategories = Config.keyWordCategories;

export {Config};
export {ActionController};
export {uiMenuController};
export {dataBase};
export {keyWordCategories};