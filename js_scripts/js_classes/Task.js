import {getCurrentUser} from "../Config.js";
import {Model} from "./Model.js";

class Task extends Model{
    constructor(id, name, dueDate, parentTaskListID, state) {
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