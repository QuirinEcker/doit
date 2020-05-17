import {Config} from "../view/Config.js";

export class TaskRepository {

    getAll(taskListId) {
        Config.dataBase.fetch("./php/resources/tasks.php", 'GET')
            .then(response => response.text())
            .then(console.log)
    }
}

TaskRepository.instance = new TaskRepository()