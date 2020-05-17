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
import {UiWindowController} from "./UiWindowController.js";
import {TaskRepository} from "../controller/TaskRepository.js";

class ActionController {
    static cancelList() {
        HTMLWriter.toggleTaskListCreatePrompt()
    }

    static confirmList() {
        let textField = document.querySelector("#create-prompt #create-taskList-prompt-text-field");
        if (textField.value !== "") {
            TaskListFactory.instace.createList(textField.value)
                .then(HTMLWriter.toggleTaskListCreatePrompt())
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
                    if (taskLists.data !== undefined) {
                        taskLists.data.forEach(taskList => user.data.taskLists[taskList.id] = taskList);
                    } else {
                        user.data.taskLists = [];
                    }
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
        const taskListId = this.parentElement.id.slice(2, this.parentElement.id.length);
        getCurrentUser().currentTaskList = taskListId;

        TaskRepository.instance.getAll(taskListId)
            .then(data => {
                data.data.forEach(task => {
                    getCurrentUser().taskLists[taskListId].tasks[task.id] = task;
                    HTMLWriter.addTask(task)
                })
            })
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
        TaskListRepository.instance.delete(taskList.id.slice(2, taskList.id.length))
            .then(taskList.remove())
    }

    static editTaskList() {
        const newName = document.querySelector("#window-edit-list #tasklist-edit-property").value;
        const uiWindow = UiWindowController.instance.uiWindows['tasklist-edit'];
        const taskListHtmlElement = document.querySelector(`#tl${uiWindow.editedId} .list-shape`);
        const taskListObject = getCurrentUser().taskLists[uiWindow.editedId]
        taskListHtmlElement.textContent = newName;
        taskListObject.name = newName;
        TaskListRepository.instance.update(taskListObject);
        uiWindow.close();
    }

    static openTaskListSettings() {
        const taskListId = this.parentElement.parentElement.id.slice(2, this.parentElement.parentElement.id.length);
        UiWindowController.instance.openWindow('tasklist-edit');
        ActionController.prepareTaskListSettings(taskListId);
        UiWindowController.instance.uiWindows['tasklist-edit'].editedId = taskListId;
    }

    static prepareTaskListSettings(id) {
        const nameInputField = document.querySelector("#window-edit-list #tasklist-edit-property");
        nameInputField.value = getCurrentUser().taskLists[id].name;
    }

    static openAddTaskWindow() {
        UiWindowController.instance.openWindow('add-task');
    }

    static addTask() {
        const nameProperty = document.querySelector("#window-add-task #task-name-property");
        const dueDateProperty = document.querySelector("#window-add-task #task-dueDate-property");
        const descProperty = document.querySelector("#window-add-task #task-description-property");

        let task = {
            name: nameProperty.value,
            dueDate: dueDateProperty.value,
            description: descProperty.value,
            state: '0',
            taskListId: getCurrentUser().currentTaskList
        }

        TaskRepository.instance.create(task)
            .then(data => {
                task.id = data.data;
                HTMLWriter.addTask(task);
            })
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}