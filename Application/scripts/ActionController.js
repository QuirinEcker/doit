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
        let userNameOrEmail = document.querySelector('#login-username-email-field').value;
        let password = document.querySelector('#login-password-field').value;


        let requestLogin = new Promise((resolve, reject) => {
            if (userNameOrEmail === 'admin' && password === 'admin') {
                console.log("Welcome admin");
                resolve()
            } else reject("wrong username or password");
            dataBase.login(userNameOrEmail, password, resolve, reject);
        })
            .then(ActionController.loadUserHome)
            .catch(HTMLWriter.writeLoginError)
    }

    static loadUserHome() {
        HTMLWriter.clearAllElementIn('#login-errors');
        ActionController.openHome();
        HTMLWriter.clearLoginInputs();
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}