import {TaskList} from "../model/TaskList.js";
import {HTMLWriter} from "./HTMLWriter.js";
import {getCurrentUser} from "./Config.js";
import {TaskListRepository} from "../controller/TaskListRepository.js";

class TaskListFactory {


    createList(listName) {
        let taskList = new TaskList("", listName);
        getCurrentUser().taskLists.push(taskList);
        TaskListRepository.instance.create(taskList);
        HTMLWriter.addTaskList(taskList);
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