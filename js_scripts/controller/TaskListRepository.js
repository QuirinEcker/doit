export class TaskListRepository {

    getAll(email) {
        return fetch(`./php/resources/taskLists.php?email=${email}`, {
            mode: "cors",
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(data => data.json())
    }

    save(user) {
        // TODO: functionality to sace the User for the current session
    }

    create(user) {
        // TODO: functionality to create User with specific data
    }
}