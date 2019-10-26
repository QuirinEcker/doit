class Task {
    constructor(name, dueDate, parentTaskListID) {
        this._tagList = new Array();
        this._name = name;
        this._dueDate = dueDate;
        this._parentTaskListID = parentTaskListID;
        Task.idNumber++;
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

Task.idNumber = 0;

export {Task}