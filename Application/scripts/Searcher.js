class Searcher {

    static search(searchString) {
        let openTasks = document.querySelector('#open-tasks').children;
        let completedTasks = document.querySelector('#completed-tasks').children;
        let tasks = new Array().concat(Array.from(openTasks), Array.from(completedTasks));

        tasks.forEach((task) => {
            let title = document.querySelector(`#${task.id} .title`).textContent;
            console.log(title);

            if (title.includes(searchString)) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });

        console.log(tasks)
    }
}

export {Searcher}