class User extends Model{
    constructor(id, username, email) {
        super();
        this.id = id;
        this.taskLists = [];
        this.username = username;
        this.email = email;
    }
}

export {User}