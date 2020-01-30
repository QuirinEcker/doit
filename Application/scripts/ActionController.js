import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {dataBase} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";
import {TaskFilter} from "./TaskFilter.js";
import {getCurrentUser} from "./Config.js";
import {setCurrentUser} from "./Config.js";
import {UserObjectUtil} from "./UserObjectUtil.js";

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

    static logout() {
        ActionController.openLogin();

        fetch('./php/logout.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .catch(console.log)
    }

    static login() {
        let userNameOrEmail = document.querySelector('#login-username-email-field').value;
        let password = document.querySelector('#login-password-field').value;


        new Promise((resolve, reject) => {
            dataBase.login(userNameOrEmail, password, resolve, reject);
        })
            .then(ActionController.loadUserHome)
            .catch(HTMLWriter.writeLoginError)
    }

    static  loadUserHome() {
        HTMLWriter.clearAllElementIn('#login-errors');
        HTMLWriter.clearAllElementIn('#task-lists-container');
        ActionController.openHome();
        HTMLWriter.clearLoginInputs();
        HTMLWriter.writeTaskListsForUser(getCurrentUser());
    }

    static loadUserList() {
        ActionController.openList();
        const taskListContainer = document.querySelectorAll(".task-list-container");
        taskListContainer.forEach(taskListContainer => HTMLWriter.clearAllElementIn(taskListContainer));
        HTMLWriter.writeTasksForTaskList(UserObjectUtil.getTaskListByID(this.parentElement.id));
    }

    static loadUserIfLoggedIn() {
        fetch('./php/getSessionUser.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(response =>  response.text())
            .then(data => {
                if (data !== "noSession") {
                    let obj = JSON.parse(data);
                    setCurrentUser(obj);
                    ActionController.loadUserHome();
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    static addList() {
        console.log("hello world");
        HTMLWriter.displayCreateListPrompt()

        return undefined;
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}