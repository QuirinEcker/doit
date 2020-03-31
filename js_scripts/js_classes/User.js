import {TaskList} from "./TaskList.js";
import {Model} from "./Model.js";

class User extends Model{
    constructor(id = 0, username = "", email = "") {
        super();
        this.id = id;
        this.taskLists = [];
        this.username = username;
        this.email = email;
    }

    import(json) {
        this.id = json.id;
        this.username = json.username;
        this.email = json.email;

        if (json.taskLists != null) {
            json.taskLists.forEach(taskList => {
                let taskListObject = new TaskList();
                taskListObject.import(taskList);
                this.taskLists[taskList.id] = taskListObject;
            })
        }
    }
}

export {User}