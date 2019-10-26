import {users} from "./Config.js";

class LoginController {

    static login(userNameOrEmail, password) {
        console.log(users);

        let user = users.filter((user) => {
            return user.email == userNameOrEmail | user.username == userNameOrEmail;
        })[0];

        if (user.password.password === password) {
            console.log("logged in");
        } else {
            console.log('fucked up');
        }
    }
}

export {LoginController}