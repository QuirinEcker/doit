import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {dataBase} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";
import {TaskFilter} from "./TaskFilter.js";
import {getCurrentUser} from "./Config.js";
import {setCurrentUser} from "./Config.js";

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


        new Promise((resolve, reject) => {
            dataBase.login(userNameOrEmail, password);
        })
            .then(ActionController.loadUserHome)
            .catch(HTMLWriter.writeLoginError)
    }

    static loadUserHome() {
        HTMLWriter.clearAllElementIn('#login-errors');
        HTMLWriter.clearAllElementIn('#task-lists-container');
        ActionController.openHome();
        HTMLWriter.clearLoginInputs();
        HTMLWriter.buildHTMLForUser(getCurrentUser());
    }

    static loadUserList() {
        ActionController.openList();
        const taskListContainer = document.querySelectorAll(".task-list-container");
        taskListContainer.forEach(taskListContainer => HTMLWriter.clearAllElementIn(taskListContainer));
        HTMLWriter.buildHTMLForList(getCurrentUser().getTaskList(this.parentElement.id));
    }

    static loadUserIfLoggedIn() {
        if (sessionStorage.getItem("token") == 'undefined') {
            fetch('./php/getSeassionUser.php', {
                mode: "cors",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `val=${getCurrentUser().sessionId}`
            })
                .then(response =>  response.text())
                .then(data => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}