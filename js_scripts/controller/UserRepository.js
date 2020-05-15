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
        return Config.dataBase.fetch('./php/resources/users.php', 'POST', JSON.stringify({
            email: email,
            username: username,
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

    update(updateObject) {
        return Config.dataBase.fetch('./php/resources/users.php', "PUT", JSON.stringify(updateObject))
            .then(response => response.text())
            .then(console.log)
    }
}

UserRepository.instance = new UserRepository();