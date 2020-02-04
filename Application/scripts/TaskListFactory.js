import {TaskList} from "./js_classes/TaskList.js";

class TaskListFactory {


    createList(listName) {
        let taskList = new TaskList(this.getRandomizedUniqueID(), listName);
    }

    getRandomizedUniqueID() {
        console.log("here");
        fetch('./php/getRandomizedUniqueID.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
            .then(data => data.text())
            .then(console.log)
    }
}

TaskListFactory.instace = new TaskListFactory();

export {TaskListFactory}