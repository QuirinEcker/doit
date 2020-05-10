export class TaskListRepository {

    getAll() {
        return fetch(`./php/resources/taskLists.php`, {
            mode: "cors",
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    save(user) {
        // TODO: functionality to sace the User for the current session
    }

    create(user) {
        // TODO: functionality to create User with specific data
    }
}

TaskListRepository.instance = new TaskListRepository();