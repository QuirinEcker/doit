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
        let taskList0 = new TaskList('tl0', 'list0');
        let taskList1 = new TaskList('tl1', 'list1');
        let task = new Task('t0', 'admin Task', Date.now(), 'tl0');
        user.addTaskList(taskList0.id, taskList0);
        user.addTaskList(taskList1.id, taskList1);
        taskList0.addTask(task.id, task);

        setCurrentUser(user);
    }
}

export {DataBase}