import {UiMenu} from "./UiMenu";

class Setup {
    static initialUiMenus(uiMenuController) {
        uiMenuController.push(new UiMenu('main', document.querySelector('main')));
        uiMenuController.push(new UiMenu('home', document.querySelector('#home')));
        uiMenuController.push(new UiMenu('login', document.querySelector('#login')));
        uiMenuController.push(new UiMenu('settings', document.querySelector('#settings')));

        uiMenuController.initiateCurrentMenu('login');
    }
}

export {Setup};