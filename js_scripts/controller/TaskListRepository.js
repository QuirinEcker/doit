import {Config} from "../view/Config.js";

export class TaskListRepository {

    getAll() {
        return Config.dataBase.fetch(`./php/resources/taskLists.php`, 'GET')
            .then(data => data.json())
    }

    save(user) {
        // TODO: functionality to sace the User for the current session
    }

    create(taskList) {
        return Config.dataBase.fetch('./php/resources/taskLists.php', 'POST', `data=${JSON.stringify(taskList)}`)
            .then(data => data.json())
    }
}

TaskListRepository.instance = new TaskListRepository();