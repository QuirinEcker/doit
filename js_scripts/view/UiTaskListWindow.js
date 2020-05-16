import {UiWindow} from "./UiWindow.js";

export class UiEditTaskListWindow extends UiWindow{

    constructor(name, htmlElement, height) {
        super(name, htmlElement, height);
        this.editedId = -1;
    }
}