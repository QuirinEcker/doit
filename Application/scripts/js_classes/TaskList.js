class TaskList {
    constructor(id, name) {
        this._tags = new Array();
        this._tasks = new Array();
        this._id = id;
        this._name = name;
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

    get tasks() {
        return this._tasks;
    }

    set id(value) {
        this._id = value;
    }

    set name(value) {
        this._name = value;
    }

    set tags(value) {
        this._tags = value;
    }

    set tasks(value) {
        this._tasks = value;
    }

    addTask(id, task) {
        this.tasks[id] = task;
    }

    addTag(id, tag) {
        this.tags[id] = tag;
    }

    getTask(id) {
        return this.tasks[id];
    }

    getTag(id) {
        return this.tags[id];
    }
}

export {TaskList}