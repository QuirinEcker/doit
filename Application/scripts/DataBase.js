import {User} from "./EntityClasses/User.js";
import {TaskList} from "./EntityClasses/TaskList.js";
import {Task} from "./EntityClasses/Task.js";
import {Tag} from "./EntityClasses/Tag.js";
import {getCurrentUser, setCurrentUser} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";

class DataBase {
    constructor(address) {
        this.adress = address
    }

    login(userNameOrEmail, passWord) {
        let user = new User('u0', 'admin', 'admin@email.com');
        let taskList = new TaskList('tl0', 'Admin Task List');
        let task = new Task('t0', 'admin Task', Date.now(), 'tl0');
        user.addTaskList(taskList.id, taskList);
        taskList.addTask(task.id, task);

        setCurrentUser(user);
        HTMLWriter.buildHTMLFor(getCurrentUser());
    }
}

export {DataBase}