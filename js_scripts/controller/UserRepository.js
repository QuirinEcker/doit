import {User} from "../model/User.js";

export class UserRepository {

    get() {
        // TODO: functionality to get the User for the current session
    }

    save(user) {
        // TODO: functionality to sace the User for the current session
    }

    create(user) {
        // TODO: functionality to create User with specific data
    }
}

UserRepository.instace = new UserRepository();