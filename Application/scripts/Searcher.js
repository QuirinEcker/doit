class Searcher {

    static search(searchString) {
        let openTasks = document.querySelector('#open-tasks').children;
        let closedTasks = document.querySelector('#closed-tasks').children;
        let suggestedTasks = document.querySelector('#suggested-tasks').children;
        let tasks = new Array().concat(Array.from(openTasks), Array.from(closedTasks), Array.from(suggestedTasks));
        let searchTask = document.querySelector('#search-task');
        let searchTaskTitle = document.querySelector(`#${searchTask.id} .title`);
        let weekDayBox = document.querySelector(`#${searchTask.id} .big-display span`);

        let allLettersNotEmpty = Array.from(searchString).filter((charAt) => {
            return charAt != ' ';
        });

        if (allLettersNotEmpty.length != 0) weekDayBox.textContent = allLettersNotEmpty[0].toUpperCase();
        else weekDayBox.textContent = ' ';


        searchTaskTitle.textContent = searchString;
        if (searchString.length != 0) {
            searchTask.style.display = 'flex';
        } else if (searchString.length == 0) {
            searchTask.style.display = 'none';
        }

        tasks.forEach((task) => {
            let title = document.querySelector(`#${task.id} .title`).textContent;

            if (title.includes(searchString) && task.id !== 'search-task') {
                task.style.display = 'flex';
            } else if (task.id !== 'search-task') {
                task.style.display = 'none';
            }
        });
    }
}

export {Searcher}