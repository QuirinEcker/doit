TaskList.idNumber = 0;

class TaskList {
    constructor(name) {
        this._id = `tl${TaskList.idNumber}`;
        this._name = name;
        this._tags = new Array();
        this._taskList = new Array();
        TaskList.idNumber++;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get tags() {
        return this._tags;
    }

    get taskList() {
        return this._taskList;
    }
}

export {TaskList}