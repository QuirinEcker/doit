import {UiMenu} from "./UiMenu.js";
import {UiMenuController} from "./UiMenuController.js";
import {ActionController} from "./ActionController.js";
import {DataBase} from "../controller/DataBase.js"
import {KeyWordCategory} from "./KeyWordCategory.js";
import {UiWindowController} from "./UiWindowController.js";
import {UiEditTaskListWindow} from "./UiTaskListWindow.js";
import {UiAddTaskWindow} from "./UiAddTaskWindow";

class Config {
    static load() {
        this.initialUiMenus();
        this.initialKeyWordCategories()
        this.initializeWindows()
    }

    static initialUiMenus() {
        this.uiMenuController.push(new UiMenu('main', document.querySelector('main')));
        this.uiMenuController.push(new UiMenu('home', document.querySelector('#home')));
        this.uiMenuController.push(new UiMenu('login', document.querySelector('#login')));
        this.uiMenuController.push(new UiMenu('settings', document.querySelector('#settings')));
        this.uiMenuController.push(new UiMenu('signup', document.querySelector('#signup-menu')));
        this.uiMenuController.push(new UiMenu('info', document.querySelector('#info-menu')));
    }

    static initializeWindows() {
        UiWindowController.instance.initiateWindow(new UiEditTaskListWindow(
            'tasklist-edit',
            document.querySelector('#window-edit-list'),
            '20vh'
        ));

        UiWindowController.instance.initiateWindow(new UiAddTaskWindow(
            'add-task',
            document.querySelector('#window-add-task'),
            '20vh'
        ));
    }

    static initialKeyWordCategories() {
        this.keyWordCategories.push(new KeyWordCategory('tag', '#'));
        this.keyWordCategories.push(new KeyWordCategory('at', '@'));
    }

    static setCurrentUser(user) {
        Config._currentUser = user;
    }

    static getCurrentUser() {
        return Config._currentUser;
    }
}

Config.uiMenuController = new UiMenuController();
Config.actionController = new ActionController();
Config.keyWordCategories = [];
Config.dataBase = new DataBase("...");
Config._currentUser = undefined;

let uiMenuController = Config.uiMenuController;
let dataBase = Config.dataBase;
let keyWordCategories = Config.keyWordCategories;
let getCurrentUser = Config.getCurrentUser;
let setCurrentUser = Config.setCurrentUser;

export {Config};
export {ActionController};
export {uiMenuController};
export {dataBase};
export {keyWordCategories};
export {getCurrentUser};
export {setCurrentUser};
