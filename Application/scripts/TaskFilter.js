import {HTMLWriter} from "./HTMLWriter.js";
import {keyWordCategories} from "./Config.js";
import {DateKeyWordAnalyzer} from "./DateKeyWordAnalyzer.js";

class TaskFilter {

    static search(searchString) {
        TaskFilter.displaySearchTask(searchString);
        TaskFilter.filterTasks(searchString)
    }

    static displaySearchTask(searchString) {
        let searchTask = document.querySelector('#search-task');
        let searchTaskTitle = document.querySelector(`#${searchTask.id} .title`);
        let separatedSearchString = TaskFilter.separateSignatures(searchString.split(' '), keyWordCategories);
        let dueDate = DateKeyWordAnalyzer.analyze(separatedSearchString.at);

        HTMLWriter.printArrayInto(searchTaskTitle, separatedSearchString.remaining, ' ');
        TaskFilter.displayTags(separatedSearchString.tag, searchTask);
        TaskFilter.displayDate(dueDate);
        TaskFilter.checkIfSearching(searchString, searchTask);
    }

    static checkIfSearching(searchString, searchTask) {
        let addTaskElement = document.querySelector('#add-task');

        if (searchString.length !== 0) {
            searchTask.style.display = 'flex';
            addTaskElement.style.display = 'none'
        } else if (searchString.length === 0) {
            searchTask.style.display = 'none';
            addTaskElement.style.display = 'flex'
        }
    }

    static displayTags(tags, searchTask) {
        let tagContainer = document.querySelector(`#${searchTask.id} .tags`);
        HTMLWriter.clearAllElementIn(tagContainer);
        tags.forEach((tag) => {
            let tagElement = HTMLWriter.addElement('div', tagContainer);
            HTMLWriter.addClass(tagElement, 'tag');
            HTMLWriter.overWriteElementTextContent(tagElement, tag);
        });
    }

    static filterTasks(searchString) {
        let openTasks = document.querySelector('#open-tasks').children;
        let closedTasks = document.querySelector('#closed-tasks').children;
        let suggestedTasks = document.querySelector('#suggested-tasks').children;
        let tasks = [].concat(Array.from(openTasks), Array.from(closedTasks), Array.from(suggestedTasks));

        tasks.forEach((task) => {
            let title = document.querySelector(`#${task.id} .title`).textContent;

            if (title.includes(searchString) && task.id !== 'search-task') {
                task.style.display = 'flex';
            } else if (task.id !== 'search-task') {
                task.style.display = 'none';
            }
        });
    }

    static separateSignatures(wordArray, keyWordCategories) {
        let separatedSearchString = {};

        keyWordCategories.forEach((keyWordCategory) => {
            separatedSearchString[keyWordCategory.name] = wordArray.filter((word) => {
                return word.charAt(0) === keyWordCategory.prefix;
            })
        });

        separatedSearchString.remaining = wordArray.filter((word) => {
            let isNormalCount = 0;

            keyWordCategories.forEach((keyWordCategory) => {
                if (word.charAt(0) === keyWordCategory.prefix) {
                    isNormalCount++;
                }
            });

            return isNormalCount === 0;
        })

        return separatedSearchString;
    }

    static displayDate(dueDate) {

    }
}

export {TaskFilter}