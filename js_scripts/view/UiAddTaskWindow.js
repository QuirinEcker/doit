import {UiWindow} from "./UiWindow.js";
import {ActionController} from "./ActionController.js";

export class UiAddTaskWindow extends UiWindow {
    constructor(name, htmlElement, height) {
        super(name, htmlElement, height);
    }

    initiateEventHandler() {
        super.initiateEventHandler();
        const cancelTaskListButton = document.querySelector("#window-add-task #cancel-task-button");
        const createTaskListButton = document.querySelector("#window-add-task #create-task-button");

        cancelTaskListButton.addEventListener('click', () => {this.close()});
        createTaskListButton.addEventListener('click', () => {
            ActionController.addTask();
            this.close();
        });
    }
}
