
class TaskListFactory {
    createList(listName) {
        console.log(listName)
    }
}

TaskListFactory.instace = new TaskListFactory();

export {TaskListFactory}