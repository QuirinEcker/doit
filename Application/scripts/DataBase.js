class DataBase {
    constructor(address) {
        this.adress = address
    }

    loadUsers() {
        let user1 = new User('user1', 'pw1', 'user1@gmail.com');
        let taskList1OfUser1 = new TaskList('work');
        let taskList2OfUser1 = new TaskList('work');
        let taskList3OfUser1 = new TaskList('work');
        user1.addTaskList(taskList1OfUser1);
        user1.addTaskList(taskList2OfUser1);
        user1.addTaskList(taskList3OfUser1);

        return [
            user1
        ]
    }

}