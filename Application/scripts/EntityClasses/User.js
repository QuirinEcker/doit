class User {
    constructor(id, username, email) {
        this._id = id;
        this._taskLists = new Array();
        this._username = username;
        this._email = email;
    }

    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }

    get taskLists() {
        return this._taskLists;
    }

    get id() {
        return this._id;
    }

    addTaskList(id, taskList) {
        this.taskLists[id] = taskList;
    }

    getTaskList(id) {
        return this._taskLists[id]
    }
}

export {User}