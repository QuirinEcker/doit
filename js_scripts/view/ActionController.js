import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";
import {dataBase} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";
import {getCurrentUser} from "./Config.js";
import {setCurrentUser} from "./Config.js";
import {TaskListFactory} from "./TaskListFactory.js";
import {UserRepository} from "../controller/UserRepository.js";
import {Config} from "./Config.js";
import {TaskListRepository} from "../controller/TaskListRepository.js";

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
        ActionController.prepareSignUp();
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
        Config.dataBase.logout();
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
        Config.dataBase.sendMail();
    }

    static async loadApp() {
        let loggedIn = await this.loadUserHome();

        if (!loggedIn) {
           this.openLogin()
        }
    }

    static deleteUser() {
        UserRepository.instance.delete()
            .then(data => {
                if (data.status === "err") console.log(data);
                ActionController.logout();
            });
    }

    static createUser() {
        const signUpEmailFieldContent = document.querySelector("#signUp-email-field").value;
        const signUpUsernameFieldContent = document.querySelector("#signUp-username-field").value;
        const signUpPasswordFieldContent = document.querySelector("#signUp-password-field").value;
        const signUpPasswordConfirmFieldContent = document.querySelector("#signUp-password-confirm-field").value;
        ActionController.prepareSignUp();
        let inputError = false;

        if (signUpPasswordFieldContent !== signUpPasswordConfirmFieldContent) {
            inputError = true;
            HTMLWriter.writeSignUpError("passwords don't match")
        }

        if (!signUpEmailFieldContent.includes("@")) {
            inputError = true;
            HTMLWriter.writeSignUpError("Invalid Email Address")
        }
        if (!inputError) {
            UserRepository.instance.create(
                signUpUsernameFieldContent,
                signUpEmailFieldContent,
                signUpPasswordFieldContent
            )
                .then(data => {
                    if (data.status === "err" && data.code === "user_already_exists") {
                        HTMLWriter.writeSignUpError("user with this Email Address already exists")
                    } else ActionController.openLogin();
                })
        }
    }

    static prepareSignUp() {
        const inputFields = Array.from(document.querySelectorAll("#signup-wrapper input"))
        inputFields.forEach((element) => {
            HTMLWriter.clearValueOf(element);
        })

        HTMLWriter.clearAllElementIn("#signup-error-box");
    }

    static updateUser(updateObject) {
        UserRepository.instance.update(updateObject);
    }

    static updateUserPassword() {
        ActionController.updateUser({
            change: "password",
            passwordNew: document.querySelector("#settings-property-password-confirm").value,
            passwordOld: document.querySelector("#settings-property-password").value
        })
    }

    static updateUserSettings() {
        getCurrentUser().username = document.querySelector("#settings-property-username").value;

        ActionController.updateUser(getCurrentUser());
    }

    static deleteTaskList() {
        const taskList = this.parentElement.parentElement;
        TaskListRepository.instance.delete(taskList.id)
            .then(taskList.remove())
    }

    static editTaskList() {
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}