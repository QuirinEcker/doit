import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {dataBase} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";
import {getCurrentUser} from "./Config.js";
import {setCurrentUser} from "./Config.js";
import {TaskListFactory} from "./TaskListFactory.js";
import {UserRepository} from "../controller/UserRepository.js";

class ActionController {
    static cancelList() {
        HTMLWriter.toggleTaskListCreatePrompt()
    }

    static confirmList() {
        let textField = document.querySelector("#create-prompt #create-taskList-prompt-text-field");
        if (textField.value !== "") {
            TaskListFactory.instace.createList(textField.value);
        }
    }

    static searchTask() {
        // TODO: Not working jet
        //TaskFilter.search(this.value);
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

    static async loadUserHome() {
        HTMLWriter.clearAllElementIn('#login-errors');
        HTMLWriter.clearAllElementIn('#task-lists-container');
        HTMLWriter.clearLoginInputs();
        UserRepository.instance.get()
            .then(user => {
                setCurrentUser(user.data);
                ActionController.fillOutSettings();
                ActionController.openHome();
            })
    }

    static fillOutSettings() {
        alert("logged in as user: " + getCurrentUser()["username"]);
        document.querySelector("#settings-property-email").value = getCurrentUser()["email"];
        document.querySelector("#settings-property-username").value = getCurrentUser()["username"]
    }

    static loadUserList() {
        ActionController.openList();
        const taskListContainer = document.querySelectorAll(".task-list-container");
        taskListContainer.forEach(taskListContainer => HTMLWriter.clearAllElementIn(taskListContainer));
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
        HTMLWriter.toggleTaskListCreatePrompt();

        return undefined;
    }

    static sendEmail() {
        const content = document.querySelector("#contact-message").value;

        fetch('./php/sendEmail.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `message=${content}`
        })
            .then(data => data.text())
            .then(console.log)
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}