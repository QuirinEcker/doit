import {Config} from "../view/Config.js";

export class TaskRepository {

    getAll(taskListId) {
        Config.dataBase.fetch(`./php/resources/tasks.php?id=${taskListId}`, 'GET')
            .then(response => response.json())
    }
}

TaskRepository.instance = new TaskRepository()