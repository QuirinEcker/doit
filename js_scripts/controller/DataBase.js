import {setCurrentUser} from "../view/Config.js";
import {ActionController} from "../view/ActionController.js";

class DataBase {
    constructor(address) {
        this.adress = address
    }

    login(userNameOrEmail, passWord, resolve, reject) {
        this.fetch('./php/login.php', 'POST', `email=${userNameOrEmail}&password=${passWord}`)
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

    logout() {
        ActionController.openLogin();
        this.fetch('./php/logout.php', 'POST')
            .catch(console.log);
    }

    sendMail() {
        const content = document.querySelector("#contact-message").value;
        this.fetch('./php/sendEmail.php', 'POST', `message=${content}`);
    }

    fetch(url, method, dataToSend) {
        if (dataToSend) {
            return fetch(url, {
                mode: "cors",
                method: method,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: dataToSend
            })
        } else  {
            return fetch(url, {
                mode: "cors",
                method: method,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
    }
}

export {DataBase}