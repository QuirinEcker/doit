import {Config} from "../view/Config.js";

export class TaskListRepository {

    getAll() {
        return Config.dataBase.fetch(`./php/resources/taskLists.php`, 'GET')
            .then(data => data.json())
    }

    save(taskList) {
        // TODO: functionality to sace the User for the current session
    }

    create(taskList) {
        return Config.dataBase.fetch('./php/resources/taskLists.php', 'POST', JSON.stringify(taskList))
            .then(data => data.json());
    }

    delete(taskListId) {
        return Config.dataBase.fetch('./php/resources/taskLists.php', 'DELETE', JSON.stringify({id: taskListId}))
            .then(data => data.text())
    }

    update(taskList) {
        return Config.dataBase.fetch('./php/resources/taskLists.php', 'PUT', JSON.stringify(taskList))
            .then(data => data.text())
            .then(console.log)
    }
}

TaskListRepository.instance = new TaskListRepository();