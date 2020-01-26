import {User} from "./js_classes/User.js";
import {TaskList} from "./js_classes/TaskList.js";
import {Task} from "./js_classes/Task.js";
import {Tag} from "./js_classes/Tag.js";
import {getCurrentUser, setCurrentUser} from "./Config.js";
import {HTMLWriter} from "./HTMLWriter.js";

class DataBase {
    constructor(address) {
        this.adress = address
    }

    login(userNameOrEmail, passWord, resolve, reject) {
        fetch('./php/login.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `val=${userNameOrEmail};${passWord}`
        })
            .then(response =>  response.text())
            .then(data => {
                console.log("hello");
                console.log(data);
                console.log("hello");
                resolve()
            })
            .catch((err) => {
                console.log(err.message)
                reject();
            });
    }
}

export {DataBase}