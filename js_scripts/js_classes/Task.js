import {getCurrentUser} from "../Config.js";

class Task extends Model{
    get state() {
        return this._state;
    }
    constructor(id, name, dueDate, parentTaskListID, state) {
        super();
        this.id = id;
        this.tags = new Array();
        this.name = name;
        this.dueDate = dueDate;
        this.parentTaskListID = parentTaskListID;
        this.state = state;
    }

    // TODO: New implementation needed
    addTag(id, tag) {
        this._tags[id] = tag;
        console.log(getCurrentUser())
        getCurrentUser().getTaskList(this._parentTaskListID).addTag(id, tag);
    }


    getTag(id) {
        return this._tags[id];
    }
}

export {Task}