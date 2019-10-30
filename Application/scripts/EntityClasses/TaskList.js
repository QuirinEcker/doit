class TaskList {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._tags = new Array();
        this._taskList = new Array();
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