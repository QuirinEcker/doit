class Searcher {

    static search(searchString) {
        let openTasks = document.querySelector('#open-tasks').children;
        let closedTasks = document.querySelector('#closed-tasks').children;
        let suggestedTasks = document.querySelector('#suggested-tasks').children;
        let tasks = new Array().concat(Array.from(openTasks), Array.from(closedTasks), Array.from(suggestedTasks));
        let searchTask = document.querySelector('#search-task');
        let searchTaskTitle = document.querySelector(`#${searchTask.id} .title`);
        let weekDayBox = document.querySelector(`#${searchTask.id} .big-display span`);

        weekDayBox.textContent = Array.from(searchString).filter((charAt) => {
            return charAt != ' ';
        })[0].toUpperCase();

        searchTaskTitle.textContent = searchString;
        if (searchString !== '') {
            searchTask.style.display = 'flex';
        } else {
            searchTask.style.display = 'none';
        }

        tasks.forEach((task) => {
            let title = document.querySelector(`#${task.id} .title`).textContent;
            console.log(title);

            if (title.includes(searchString)) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }
}

export {Searcher}