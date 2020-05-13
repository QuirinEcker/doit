import {TaskListRepository} from "./TaskListRepository.js";

export class UserRepository {

    get() {
        return fetch('./php/resources/users.php', {
            mode: "cors",
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(data => data.json())
    }

    save(user) {
        // TODO: functionality to sace the User for the current session
    }

    create(username, email, password) {
        return fetch('./php/resources/users.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: "data=" + JSON.stringify(
                {
                    username: username,
                    email: email,
                    password: password
                }
            )
        })
            .then(data => data.json())
    }

    getTaskLists() {
        return TaskListRepository.instance.getAll()
    }

    delete(email) {
        return fetch('./php/resources/users.php', {
            mode: "cors",
            method: "DELETE",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(data => data.json())
    }
}

UserRepository.instance = new UserRepository();