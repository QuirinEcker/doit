import {UiMenu} from "./UiMenu.js";
import {UiMenuController} from "./UiMenuController.js";
import {ActionController} from "./ActionController.js";
import {DataBase} from "./DataBase.js"

class Config {
    static load() {
        this.initialUiMenus();
    }

    static initialUiMenus() {
        this.uiMenuController.push(new UiMenu('main', document.querySelector('main')));
        this.uiMenuController.push(new UiMenu('home', document.querySelector('#home')));
        this.uiMenuController.push(new UiMenu('login', document.querySelector('#login')));
        this.uiMenuController.push(new UiMenu('settings', document.querySelector('#settings')));

        this.uiMenuController.initiateCurrentMenu('login');
    }
}

Config.uiMenuController = new UiMenuController();
Config.actionController = new ActionController();
Config.dataBase = new DataBase("omsdoifm");
Config.users = Config.dataBase.loadUsers();


let uiMenuController = Config.uiMenuController;
let actionController = Config.actionController;
let dataBase = Config.dataBase;
let users = Config.users;

export {Config};
export {actionController};
export {uiMenuController};
export {dataBase};
export {users}