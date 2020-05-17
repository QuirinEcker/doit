import {Config} from "../view/Config.js";

export class TaskRepository {

    getAll(taskListId) {
        return Config.dataBase.fetch(`./php/resources/tasks.php?id=${taskListId}`, 'GET')
            .then(response => response.json())
    }

    create(task) {
        return Config.dataBase.fetch(`./php/resources/tasks.php`, 'POST', JSON.stringify(task))
            .then(response => response.json())
    }
}

TaskRepository.instance = new TaskRepository()