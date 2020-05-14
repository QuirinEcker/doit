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
        return fetch('./php/resources/taskLists.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `data=${JSON.stringify(taskList)}`
        })
            .then(data => data.json())
    }
}

TaskListRepository.instance = new TaskListRepository();