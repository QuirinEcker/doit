export class TaskRepository {

    get(taskListId) {
        console.log(taskListId);
    }
}

TaskRepository.instance = new TaskRepository()