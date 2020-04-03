import {Model} from "./Model.js";
import {Tag} from "./Tag.js";

class Task extends Model{
    constructor(id = 0, name = "", dueDate = new Date(), parentTaskListID = 0, state = 0) {
        super();
        this.id = id;
        this.tags = [];
        this.name = name;
        this.dueDate = dueDate;
        this.taskListID = parentTaskListID;
        this.state = state;
    }

    import(json) {
        this.id = json.id;
        this.name = json.name;
        this.dueDate = new Date(json.dueDate);
        this.taskListID = json.taskListID;
        this.state = json.state;

        if (json.tags != null) {
            json.tags.forEach(tag => {
                let tagObject = new Tag();
                tagObject.import(tag);
                this.tags[tagObject.id] = tagObject;
            })
        }
    }
}

export {Task}