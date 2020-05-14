import {TaskListRepository} from "./TaskListRepository.js";
import {Config} from "../view/Config.js";

export class UserRepository {
    get() {
        return Config.dataBase.fetch('./php/resources/users.php', "GET")
            .then(data => data.json())
    }

    save(user) {
        // TODO: functionality to sace the User for the current session
    }

    create(username, email, password) {
        return Config.dataBase.fetch('./php/resources/users.php', 'POST', "data=" + JSON.stringify({
                username: username,
                email: email,
                password: password
            }))
            .then(data => data.json())
    }

    getTaskLists() {
        return TaskListRepository.instance.getAll()
    }

    delete() {
        return Config.dataBase.fetch('./php/resources/users.php', 'DELETE')
            .then(data => data.json());
    }
}

UserRepository.instance = new UserRepository();