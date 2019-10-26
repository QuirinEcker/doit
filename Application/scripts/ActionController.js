import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {LoginController} from "./LoginController.js";

class ActionController {
    openHome() {
        openMenu('home', Animations.circleAnimation);
    }

    openList() {
        openMenu('main', Animations.circleAnimation);
    }

    openLogin() {
        openMenu('login', Animations.circleAnimation);
    }

    openSettings() {
        openMenu('settings', Animations.circleAnimation);
    }

    login() {
        let userNameOrEmail = "user1@gmail.com"
        let password = "psadflamsw1"

        LoginController.login(userNameOrEmail, password);
        this.openHome();
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}