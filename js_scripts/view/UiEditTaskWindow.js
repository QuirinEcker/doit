import {UiWindow} from "./UiWindow.js";
import {ActionController} from "./ActionController.js";
import {getCurrentUser} from "./Config.js";

export class UiEditTaskWindow extends UiWindow{
    constructor(name, htmlElement, height) {
        super(name, htmlElement, height);
        this.taskId = -1;
    }

    prepare() {
        super.prepare();

        const nameProperty = document.querySelector("#window-edit-task #task-name-edit-property");
        const dueDateProperty = document.querySelector("#window-edit-task #task-dueDate-edit-property");
        const descProperty = document.querySelector("#window-edit-task #task-description-edit-property");
        const dueDateMinuteProperty = document.querySelector("#window-edit-task #task-dueDate-time-edit-property .minutes");
        const dueDateHoursProperty = document.querySelector("#window-edit-task #task-dueDate-time-edit-property .hours");
        const selectedTask = getCurrentUser().taskLists[getCurrentUser().currentTaskList].tasks[this.taskId];
        const dueDate = new Date(selectedTask.dueDate)
        const month = dueDate.getMonth() < 10 ? "0" + dueDate.getMonth() : dueDate.getMonth();
        const date = dueDate.getDate() < 10 ? "0" + dueDate.getDate() : dueDate.getDate();
        const inputDate = `${dueDate.getFullYear()}-${month}-${date}`

        nameProperty.value = selectedTask.name;
        dueDateProperty.value = inputDate;
        dueDateHoursProperty.value = dueDate.getHours();
        dueDateMinuteProperty.value = dueDate.getMinutes();
        descProperty.value = selectedTask.description;
        // TODO: Fix Description
    }

    initiateEventHandler() {
        super.initiateEventHandler();
        const cancelTaskListButton = document.querySelector("#window-edit-task #cancel-task-edit-button");
        const createTaskListButton = document.querySelector("#window-edit-task #create-task-edit-button");

        cancelTaskListButton.addEventListener('click', () => {this.close()});
        createTaskListButton.addEventListener('click', () => {
            ActionController.updateTask();
            this.close();
        });
    }

}