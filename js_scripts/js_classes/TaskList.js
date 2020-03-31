class TaskList extends Model{
    constructor(id, name) {
        super();
        this.tags = [];
        this.tasks = [];
        this.id = id;
        this.name = name;
    }
}

export {TaskList}