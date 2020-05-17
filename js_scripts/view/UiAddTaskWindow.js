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

    prepare() {
        super.prepare();

        const nameProperty = document.querySelector("#window-add-task #task-name-property");
        const dueDateProperty = document.querySelector("#window-add-task #task-dueDate-property");
        const descProperty = document.querySelector("#window-add-task #task-description-property");

        nameProperty.value = "";
        dueDateProperty.value = "";
        descProperty.value = "";
    }
}
