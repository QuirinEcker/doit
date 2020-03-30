class User extends Model{
    constructor(id, username, email) {
        super();
        this.id = id;
        this.taskLists = new Array();
        this.username = username;
        this.email = email;
    }

    // TODO: kinda bad implementation. New Implementation is needed
    addTaskList(id, taskList) {
        this.taskLists[id] = taskList;
    }

    // TODO: kinda bad implementation. New Implementation is needed
    getTaskList(id) {
        return this._taskLists[id]
    }
}

export {User}