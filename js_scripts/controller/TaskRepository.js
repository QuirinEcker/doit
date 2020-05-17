import {Config} from "../view/Config.js";
import {getCurrentUser} from "../view/Config.js";

export class TaskRepository {

    getAll(taskListId) {
        return Config.dataBase.fetch(`./php/resources/tasks.php?id=${taskListId}`, 'GET')
            .then(response => response.json())
    }

    create(task) {
        return Config.dataBase.fetch(`./php/resources/tasks.php`, 'POST', JSON.stringify(task))
            .then(response => response.json())
    }

    update() {
        console.log("update not implemented");
    }

    delete(id) {
        console.log(id)
        return Config.dataBase.fetch('./php/resources/tasks.php', 'DELETE', JSON.stringify({
            id: id,
            taskListId: getCurrentUser().currentTaskList
        }))
            .then(response => response.json())
    }
}

TaskRepository.instance = new TaskRepository()