import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {DataBase} from "./DataBase";
import {dataBase} from "./Config";

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
        let userNameOrEmail = "user2@gmail.com"
        let password = "psadflamsw1"


        let requestLogin = new Promise(() => {
            dataBase.login(userNameOrEmail, password);
        })
            .then(() => ActionController.openHome())
            .catch(() => new loginError)

    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}