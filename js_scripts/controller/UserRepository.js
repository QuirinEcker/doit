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

    create(user) {
        // TODO: functionality to create User with specific data
    }
}

UserRepository.instance = new UserRepository();