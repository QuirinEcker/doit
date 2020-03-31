import {TaskList} from "./TaskList.js";

class User extends Model{
    constructor(id, username, email) {
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
                this.taskLists.push(taskListObject);
            })
        }
    }
}

export {User}