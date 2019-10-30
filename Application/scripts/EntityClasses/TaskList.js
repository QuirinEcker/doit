class TaskList {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._tags = new Array();
        this._tasks = new Array();
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
        return this._tasks;
    }

    addTask(task) {
        this._tasks.push(task);
    }
}

export {TaskList}