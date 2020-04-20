import {getCurrentUser, setCurrentUser} from "../view/Config.js";

class DataBase {
    constructor(address) {
        this.adress = address
    }

    login(userNameOrEmail, passWord, resolve, reject) {
        fetch('./php/login.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `email=${userNameOrEmail}&password=${passWord}`
        })
            .then(response =>  response.text())
            .then(data => {
                console.log(data);
                let jsonData = JSON.parse(data);
                if (jsonData.status === "err") {
                    reject("Wrong Username or Password");
                } else {
                    setCurrentUser(jsonData);
                    sessionStorage.setItem("token", jsonData.token);
                    resolve()
                }
            })
            .catch((err) => {
                console.log(err.message);
                reject();
            });
    }

    save() {
        fetch('./php/save.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `val=${JSON.stringify(getCurrentUser())}`
        })
            .then(data => data.text())
            .then(console.log);
    }

    getUser() {
        return fetch('./php/resources/users.php', {
            mode: "cors",
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .then(data => data.json())
    }
}

export {DataBase}