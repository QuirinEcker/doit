import {TaskList} from "./js_classes/TaskList.js";
import {dataBase} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";
import {getCurrentUser} from "./Config.js";

class TaskListFactory {


    createList(listName) {
        let id;
        this.getRandomizedUniqueID()
            .then(number => {
                id = number;
                console.log(id);
                let taskList = new TaskList(id, listName);
                console.log(getCurrentUser());
                getCurrentUser().taskLists.push(taskList);
                console.log(taskList);
                dataBase.save();
                HTMLWriter.addTaskList(taskList);
            });
    }

    getRandomizedUniqueID() {
        return fetch('./php/getRandomizedUniqueID.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
            .then(data => data.text())
            .then(data => {return data})
    }
}

TaskListFactory.instace = new TaskListFactory();

export {TaskListFactory}