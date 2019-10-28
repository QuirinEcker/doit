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
        let weekDayBox = document.querySelector(`#${searchTask.id} .big-display span`);
        let tagContainer = document.querySelector(`#${searchTask.id} .tags`);
        let words = searchString.split(' ');
        let separatedSearchString = TaskFilter.separateSignatures(words, keyWordCategories);
        let dueDate = DateKeyWordAnalyzer.analyze(separatedSearchString.at);

        let allLettersNotEmpty = Array.from(searchString).filter((charAt) => {
            return charAt !== ' ';
        });
        if (allLettersNotEmpty.length !== 0) weekDayBox.textContent = allLettersNotEmpty[0].toUpperCase();
        else weekDayBox.textContent = ' ';
        HTMLWriter.printArrayInto(searchTaskTitle, separatedSearchString.remaining, ' ');
        HTMLWriter.clearAllElementIn(tagContainer);

        separatedSearchString.tag.forEach((tag) => {
            let tagElement = HTMLWriter.addElement('div', tagContainer);
            HTMLWriter.addClass(tagElement, 'tag');
            HTMLWriter.overWriteElementTextContent(tagElement, tag);
        });

        if (searchString.length !== 0) {
            searchTask.style.display = 'flex';
        } else if (searchString.length === 0) {
            searchTask.style.display = 'none';
        }
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
}

export {TaskFilter}