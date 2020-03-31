class TaskList extends Model{
    constructor(id, name) {
        super();
        this.tags = [];
        this.tasks = [];
        this.id = id;
        this.name = name;
    }

    import(json) {
        this.id = json.id;
        this.name = json.name;
    }
}

export {TaskList}