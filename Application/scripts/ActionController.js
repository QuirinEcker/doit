import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {dataBase} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";
import {TaskFilter} from "./TaskFilter.js";
import {getCurrentUser} from "./Config.js";

class ActionController {
    static searchTask() {
        TaskFilter.search(this.value);
    }

    static openSignUp() {
        openMenu('signup', Animations.circleAnimation);
    }

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

    static openInfo() {
        openMenu('info', Animations.circleAnimation);
    }

    static login() {
        let userNameOrEmail = document.querySelector('#login-username-email-field').value;
        let password = document.querySelector('#login-password-field').value;


        let requestLogin = new Promise((resolve, reject) => {
            if (userNameOrEmail === 'admin' && password === 'admin') {
                console.log("Welcome admin");
                dataBase.login(userNameOrEmail, password, resolve, reject);
                resolve()
            } else reject("wrong username or password");
        })
            .then(ActionController.loadUserHome)
            .catch(HTMLWriter.writeLoginError)
    }

    static loadUserHome() {
        HTMLWriter.clearAllElementIn('#login-errors');
        ActionController.openHome();
        HTMLWriter.clearLoginInputs();
        HTMLWriter.buildHTMLForUser(getCurrentUser());
    }

    static loadUserList() {
        ActionController.openList();
        HTMLWriter.buildHTMLForList(getCurrentUser().getTaskList(this.parentElement.id));
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}