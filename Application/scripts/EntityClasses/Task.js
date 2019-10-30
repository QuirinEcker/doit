import {getCurrentUser} from "../Config.js";

class Task {
    get state() {
        return this._state;
    }
    constructor(id, name, dueDate, parentTaskListID, state) {
        this._id = id;
        this._tags = new Array();
        this._name = name;
        this._dueDate = dueDate;
        this._parentTaskListID = parentTaskListID;
        this._state = state;
    }

    get id() {
        return this._id;
    }

    get tags() {
        return this._tags;
    }

    get name() {
        return this._name;
    }

    get dueDate() {
        return this._dueDate;
    }

    get parentTaskListID() {
        return this._parentTaskListID;
    }

    get tagList() {
        return this._tags;
    }

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