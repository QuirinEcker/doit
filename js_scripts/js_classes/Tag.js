import {Model} from "./Model.js";
import {Task} from "./Task.js";

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

        if (json.tasks != null) {
            json.tasks.forEach(task => {
                let taskObject = new Task();
                taskObject.import(task);
                this.tasks[taskObject.id] = taskObject;
            })
        }
    }
}

export {Tag}