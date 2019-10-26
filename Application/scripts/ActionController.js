import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {dataBase} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";

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
        let userNameOrEmail = "user2@gmail.com";
        let password = "psadflamsw1"


        let requestLogin = new Promise((resolve, reject) => {
            dataBase.login(userNameOrEmail, password, resolve, reject);
            resolve();
        })
            .then(ActionController.openHome)
            .catch(() => {
                let element = HTMLWriter.addElement('div', '#login-errors');
                HTMLWriter.addClass(element, 'error')
                HTMLWriter.overWriteElement(element, "Wrong Username or Password")
            })

    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}