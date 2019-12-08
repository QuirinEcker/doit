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

    login(userNam43eOrEmail, passWord, resolve, reject) {
        fetch("./loadTaskLists.php", {
            mode: "cors",
            method: 'GET',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(data => {
                return data.text();
            })
            .then(text => {
                let date = new Date();
                let user = new User('u0', 'admin', 'admin@email.com');
                setCurrentUser(user)
                text.split("\n").forEach(line => {
                    let tasklist = new TaskList(line.split(";")[0], line.split(";")[1]);
                    getCurrentUser().addTaskList(tasklist.id, tasklist);
                });

                fetch("./loadTasks.php")
                    .then(data => data.text())
                    .then(text => {
                        text.split("\n").forEach(line => {
                            let lineFragments = line.split(";");
                            let task = new Task(lineFragments[0], lineFragments[1], date, lineFragments[2], lineFragments[3]);
                            getCurrentUser().getTaskList(lineFragments[2]).addTask(task.id, task);
                        });
                    });
                resolve();
            })
            .catch(reason => console.log(reason))
    }
}

export {DataBase}