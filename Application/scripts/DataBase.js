import {getCurrentUser, setCurrentUser} from "./Config.js";

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
                let jsonData = JSON.parse(data);
                if (jsonData.status === "err") {
                    reject("Wrong Username or Password");
                } else {
                    setCurrentUser(jsonData);
                    console.log(jsonData);
                    resolve()
                }
            })
            .catch((err) => {
                console.log(err.message)
                reject();
            });
    }
}

export {DataBase}