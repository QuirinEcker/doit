import {NavigationSwipeController} from "./NavigationSwipeController.js";
import {ActionController} from "./ActionController.js";

class HTMLWriter {
    static getElement(elementOrSelector) {
        if (typeof elementOrSelector === "string") {
            return document.querySelector(elementOrSelector);
        } else {
            return elementOrSelector;
        }
    }

    static changeValueOf(elementOrSelector, value) {
        HTMLWriter.getElement(elementOrSelector).value = value;
    }

    static clearValueOf(elementOrSelector) {
        HTMLWriter.changeValueOf(elementOrSelector, '');
    }

    static overWriteElementTextContent(elementOrSelector, text) {
        HTMLWriter.getElement(elementOrSelector).textContent = text;
    }

    static addElement(type, parentElementOrSelector) {
        let element = document.createElement(type);
        let parentElement = HTMLWriter.getElement(parentElementOrSelector);
        parentElement.appendChild(element);
        return element;
    }

    static changeId(elementOrSelector, id){
        HTMLWriter.getElement(elementOrSelector).id = id;
    }

    static addClass(elementOrSelector, className) {
        HTMLWriter.getElement(elementOrSelector).classList.add(className);
    }

    static clearAllElementIn(elementOrSelector) {
        while (HTMLWriter.getElement(elementOrSelector).children.length != 0) {
            HTMLWriter.getElement(elementOrSelector).removeChild(HTMLWriter.getElement(elementOrSelector).lastChild);
        }
    }

    static writeLoginError(reason) {
        HTMLWriter.clearAllElementIn('#login-errors');
        let element = HTMLWriter.addElement('div', '#login-errors');
        HTMLWriter.addClass(element, 'login-error');
        HTMLWriter.overWriteElementTextContent(element, reason)
        console.log(reason)
    }

    static clearLoginInputs() {
        HTMLWriter.clearValueOf('#login-username-email-field');
        HTMLWriter.clearValueOf('#login-password-field');
    }

    static printArrayInto(elementOrSelector, elements, separator) {
        let endString = '';

        if (separator === undefined) {
            elements.forEach((element) => {
                endString += element;
            });
        } else {
            elements.forEach((element) => {
                endString += element;
                endString += separator;
            });
        }

        HTMLWriter.getElement(elementOrSelector).textContent = endString;
    }

    static writeTaskListsForUser(currentUser) {
        currentUser.taskLists.forEach((taskList) => {
            HTMLWriter.addTaskList(taskList)
        });
    }

    static addTaskList(taskList) {
        let taskListContainer = document.querySelector('#home #task-lists #task-lists-container');
        let taskListElement = HTMLWriter.addElement('div', taskListContainer);
        HTMLWriter.addClass(taskListElement, 'task-list');
        HTMLWriter.changeId(taskListElement, taskList.id);
        let taskListShapeElement = HTMLWriter.addElement('div', taskListElement);
        HTMLWriter.addClass(taskListShapeElement, 'list-shape')
        let taskListNavElement = HTMLWriter.addElement('div', taskListElement);
        HTMLWriter.addClass(taskListNavElement, 'list-nav')
        let navElement = HTMLWriter.addElement('i', taskListNavElement);
        HTMLWriter.addClass(navElement, 'fas');
        HTMLWriter.addClass(navElement, 'fa-trash');

        HTMLWriter.overWriteElementTextContent(taskListShapeElement, taskList.name);
        NavigationSwipeController.addSwipe(taskListShapeElement);
        taskListShapeElement.addEventListener('click', ActionController.loadUserList);
    }

    static addTask(task) {
        let taskListContainer = document.querySelector(`#${task.state}-tasks`);
        let taskElement = HTMLWriter.addElement('div', taskListContainer);
        HTMLWriter.addClass(taskElement, 'task');
        HTMLWriter.changeId(taskElement, task.id);

        let bigDisplay = HTMLWriter.addElement('div', taskElement);
        HTMLWriter.addClass(bigDisplay, 'big-display');
        let bigDisplaySpan = HTMLWriter.addElement('div', bigDisplay);
        HTMLWriter.overWriteElementTextContent(bigDisplaySpan, HTMLWriter.getWeakDay(task.dueDate));

        let informationElement = HTMLWriter.addElement('div', taskElement);
        HTMLWriter.addClass(informationElement, 'information');

        let title = HTMLWriter.addElement('div', informationElement);
        HTMLWriter.addClass(title, 'title');
        HTMLWriter.overWriteElementTextContent(title, task.name);

        let dateTime = HTMLWriter.addElement('div', informationElement);
        HTMLWriter.addClass(dateTime, 'date-time');
        let date = HTMLWriter.addElement('div', dateTime);
        HTMLWriter.addClass(date, 'date');
        HTMLWriter.overWriteElementTextContent(date, task.dueDate.toLocaleString())
        let time = HTMLWriter.addElement('div', dateTime);
        HTMLWriter.addClass(time, 'time');
        HTMLWriter.overWriteElementTextContent(time, '16:00')

        let tags = HTMLWriter.addElement('div', informationElement);
        HTMLWriter.addClass(tags, 'tags');

        HTMLWriter.getValuesOf(task.tags).forEach((tag) => {
            let tagElement = HTMLWriter.addElement('div', tags);
            HTMLWriter.addClass(tagElement, 'tag')
            HTMLWriter.changeId(tagElement, tag.id)
            HTMLWriter.overWriteElementTextContent(tagElement, tag.name);
        })
    }

    static getValuesOf(hashArray) {
        let array = [];

        for (let item in hashArray) {
            array.push(hashArray[item]);
        }

        return array;
    }

    static getWeakDay(dueDate) {
        console.log(dueDate.getDay())
        switch (dueDate.getDay()) {
            case 0: return 'So';
            case 1: return 'Mo';
            case 2: return 'Di';
            case 3: return 'Mi';
            case 4: return 'Do';
            case 5: return 'Fr';
            case 6: return 'Sa';
        }
    }

    static writeTasksForTaskList(list) {
        console.log(list);

        list.tasks.forEach(task => HTMLWriter.addTask(task));
    }
}

export {HTMLWriter}