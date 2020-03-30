class TaskList extends Model{
    constructor(id, name) {
        super();
        this.tags = [];
        this.tasks = [];
        this.id = id;
        this.name = name;
    }

    // TODO: new implementation is needed for the add and get Method´
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