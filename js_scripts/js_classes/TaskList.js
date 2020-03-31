import {Model} from "./Model.js";
import {Task} from "./Task.js";
import {Tag} from "./Tag.js";

class TaskList extends Model{
    constructor(id = 0, name = "", userID = "") {
        super();
        this.tags = [];
        this.tasks = [];
        this.id = id;
        this.name = name;
        this.userID = userID;
    }

    import(json) {
        this.id = json.id;
        this.name = json.name;
        this.userID = json.userID;

        if (json.tasks != null) {
            json.tasks.forEach(task => {
                let taskObject = new Task();
                taskObject.import(task);
                this.tasks[taskObject.id] = taskObject;
            })
        }

        if (json.tags != null) {
            json.tags.forEach(tag => {
                let tagObject = new Tag();
                tagObject.import(tag);
                this.tags[tagObject.id] = tagObject;
            })
        }
    }
}

export {TaskList}