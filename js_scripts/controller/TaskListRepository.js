export class TaskListRepository {

    getAll() {
        return fetch(`./php/resources/taskLists.php`, {
            mode: "cors",
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
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

        // TODO: functionality to create User with specific data
    }
}

TaskListRepository.instance = new TaskListRepository();