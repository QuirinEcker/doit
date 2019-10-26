class User {
    constructor(username, password, email) {
        this._taskLists = new Array();
        this._id = `u${User.idNumber}`;
        this._username = username;
        this._password = new EncryptedPassword(password);
        this._email = email;
        User.idNumber++;
    }

    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }

    get email() {
        return this._email;
    }

    get taskLists() {
        return this._taskLists;
    }

    get id() {
        return this._id;
    }

    addTaskList(taskList) {
        this.taskLists.push(taskList);
    }
}

User.idNumber = 0;

export {User}