import {getCurrentUser, setCurrentUser} from "../view/Config.js";
import {ActionController} from "../view/ActionController.js";

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

    logout() {
        ActionController.openLogin();

        fetch('./php/logout.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
            .catch(console.log)
    }

    sendMail() {
        const content = document.querySelector("#contact-message").value;

        fetch('./php/sendEmail.php', {
            mode: "cors",
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `message=${content}`
        })
            .then(data => data.text())
            .then(console.log)
    }

    fetch(url, method, dataToSend = "") {
        return fetch(url, {
            mode: "cors",
            method: method,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: dataToSend
        })
    }
}

export {DataBase}