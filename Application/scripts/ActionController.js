import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {LoginController} from "./LoginController.js";

class ActionController {
    static openHome() {
        openMenu('home', Animations.circleAnimation);
    }

    static openList() {
        openMenu('main', Animations.circleAnimation);
    }

    static openLogin() {
        openMenu('login', Animations.circleAnimation);
    }

    static openSettings() {
        openMenu('settings', Animations.circleAnimation);
    }

    static login() {
        let userNameOrEmail = "user1@gmail.com"
        let password = "psadflamsw1"

        LoginController.login(userNameOrEmail, password);
        ActionController.openHome();
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}