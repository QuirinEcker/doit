import {Model} from "./Model.js";

class Task extends Model{
    constructor(id = 0, name = "", dueDate = new Date(), parentTaskListID = 0, state = 0) {
        super();
        this.id = id;
        this.tags = new Array();
        this.name = name;
        this.dueDate = dueDate;
        this.parentTaskListID = parentTaskListID;
        this.state = state;
    }
}

export {Task}