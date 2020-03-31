import {Model} from "./Model.js";

class Tag extends Model{

    constructor(id = 0, name = "", taskListID = 0) {
        super();
        this.id = id;
        this.name = name;
        this.taskListID = taskListID;
        this.tasks = [];
    }

    import(json) {
        this.id = json.id;
        this.name = json.name;
        this.taskListID = json.taskListID;
    }
}

export {Tag}