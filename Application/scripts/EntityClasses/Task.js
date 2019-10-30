class Task {
    constructor(id, name, dueDate, parentTaskListID) {
        this._id = id;
        this._tagList = new Array();
        this._name = name;
        this._dueDate = dueDate;
        this._parentTaskListID = parentTaskListID;
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
        return this._tagList;
    }
}

export {Task}