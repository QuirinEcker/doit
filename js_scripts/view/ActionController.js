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
        return UserRepository.instance.get()
            .then(async user => {
                const taskLists = await UserRepository.instance.getTaskLists();
                if (taskLists.status !== 'err' && user.status !== 'err') {
                    user.data.taskLists = taskLists.data;
                    setCurrentUser(user.data);
                    ActionController.fillOutSettings();
                    ActionController.openHome();
                    HTMLWriter.writeTaskListsForUser(getCurrentUser());
                    return true;
                } else return false
            })
    }

    static fillOutSettings() {
        document.querySelector("#settings-property-email").value = getCurrentUser()["email"];
        document.querySelector("#settings-property-username").value = getCurrentUser()["username"]
    }

    static loadUserList() {
        ActionController.openList();
        const taskListContainer = document.querySelectorAll(".task-list-container");
        taskListContainer.forEach(taskListContainer => HTMLWriter.clearAllElementIn(taskListContainer));
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

    static async loadApp() {
        let loggedIn = await this.loadUserHome();

        if (!loggedIn) {
           this.openLogin()
        }
    }

    static deleteUser() {
        UserRepository.instance.delete(getCurrentUser().email)
            .then(data => {
                if (data.status === "err") console.log(data);
                ActionController.logout();
            });
    }

    static createUser() {
        const signUpEmailField = document.querySelector("#signUp-email-field");
        const signUpUsernameField = document.querySelector("#signUp-username-field");
        const signUpPasswordField = document.querySelector("#signUp-password-field");
        const signUpPasswordConfirmField = document.querySelector("#signUp-password-confirm-field");

        if (signUpPasswordField.value === signUpPasswordConfirmField.value) {
            UserRepository.instance.create(
                signUpUsernameField.value,
                signUpEmailField.value,
                signUpPasswordField.value
            )
        }
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}