import {Model} from "./Model.js";

class Tag extends Model{

    constructor(id = 0, name = "", taskListID = 0) {
        super();
        this.id = id;
        this.name = name;
        this.taskListID = taskListID;
        this.tasksID = [];
    }

    import(json) {
        this.id = json.id;
        this.name = json.name;
        this.taskListID = json.taskListID;

        if (json.tasks != null) {
            json.tasksID.forEach(taskID => {
                this.tasksID = taskID;
            })
        }
    }
}

export {Tag}