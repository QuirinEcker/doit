import {NavigationSwipeController} from "./NavigationSwipeController.js";
import {ActionController} from "./ActionController.js";
import {CreatePromptController} from "./CreatePromptController.js";

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
        while (HTMLWriter.getElement(elementOrSelector).children.length !== 0) {
            HTMLWriter.getElement(elementOrSelector).removeChild(HTMLWriter.getElement(elementOrSelector).lastChild);
        }
    }

    static writeLoginError(reason) {
        HTMLWriter.writeError("#login-errors", reason)
    }

    static writeError(elementOrSelector, errorMessage) {
        let error = HTMLWriter.addElement('div', elementOrSelector);
        HTMLWriter.addClass(error, 'error');
        HTMLWriter.overWriteElementTextContent(error, errorMessage)
    }

    static writeSignUpError(reason) {
        HTMLWriter.writeError("#signup-error-box", reason);
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
        HTMLWriter.changeId(taskListElement, `tl${taskList.id}`);
        let taskListShapeElement = HTMLWriter.addElement('div', taskListElement);
        HTMLWriter.addClass(taskListShapeElement, 'list-shape');
        let taskListNavElement = HTMLWriter.addElement('div', taskListElement);
        HTMLWriter.addClass(taskListNavElement, 'list-nav');
        let navElementEdit = HTMLWriter.addElement('i', taskListNavElement);
        HTMLWriter.addClass(navElementEdit, 'fas');
        HTMLWriter.addClass(navElementEdit, 'fa-pencil-alt');
        HTMLWriter.addClass(navElementEdit, 'nav-list-icon');
        HTMLWriter.changeId(navElementEdit, 'delete-tasklist-button');
        let navElementTrash = HTMLWriter.addElement('i', taskListNavElement);
        HTMLWriter.addClass(navElementTrash, 'fas');
        HTMLWriter.addClass(navElementTrash, 'fa-trash');
        HTMLWriter.addClass(navElementTrash, 'nav-list-icon');
        HTMLWriter.changeId(navElementTrash, 'edit-tasklist-button')

        navElementTrash.addEventListener('click', ActionController.deleteTaskList);
        navElementEdit.addEventListener('click', ActionController.openTaskListSettings);

        HTMLWriter.overWriteElementTextContent(taskListShapeElement, taskList.name);
        NavigationSwipeController.addSwipe(taskListShapeElement);
        taskListShapeElement.addEventListener('click', ActionController.loadUserList);
    }

    static addTask(task) {
        let taskListContainer = document.querySelector(`#${task.state === '0' ? 'open' : 'closed'}-tasks`);
        let taskElement = HTMLWriter.addElement('div', taskListContainer)
        HTMLWriter.changeId(taskElement, `t${task.id}`);
        HTMLWriter.addClass(taskElement, 'task');
        let taskShapeElement = HTMLWriter.addElement('div', taskElement);
        HTMLWriter.addClass(taskShapeElement, 'task-shape');

        let bigDisplay = HTMLWriter.addElement('div', taskShapeElement);
        HTMLWriter.addClass(bigDisplay, 'big-display');
        let bigDisplaySpan = HTMLWriter.addElement('div', bigDisplay);
        const dueDate = new Date(task.dueDate);
        console.log(dueDate);
        console.log(task.dueDate);

        HTMLWriter.overWriteElementTextContent(bigDisplaySpan, HTMLWriter.getWeakDay(dueDate));

        let informationElement = HTMLWriter.addElement('div', taskShapeElement);
        HTMLWriter.addClass(informationElement, 'information');

        let title = HTMLWriter.addElement('div', informationElement);
        HTMLWriter.addClass(title, 'title');
        HTMLWriter.overWriteElementTextContent(title, task.name);

        let dateTime = HTMLWriter.addElement('div', informationElement);
        HTMLWriter.addClass(dateTime, 'date-time');
        let date = HTMLWriter.addElement('div', dateTime);
        HTMLWriter.addClass(date, 'date');
        HTMLWriter.overWriteElementTextContent(date, dueDate.toLocaleString());
        let time = HTMLWriter.addElement('div', dateTime);
        HTMLWriter.addClass(time, 'time');
        HTMLWriter.overWriteElementTextContent(time, '16:00');
        time.style.display = 'none';

        let tags = HTMLWriter.addElement('div', informationElement);
        HTMLWriter.addClass(tags, 'tags');

        HTMLWriter.getValuesOf(task.tags).forEach((tag) => {
            let tagElement = HTMLWriter.addElement('div', tags);
            HTMLWriter.addClass(tagElement, 'tag');
            HTMLWriter.changeId(tagElement, tag.id);
            HTMLWriter.overWriteElementTextContent(tagElement, tag.name);
        })

        let taskNav = HTMLWriter.addElement('div', taskElement);
        HTMLWriter.addClass(taskNav, 'task-nav');
        let navElementEdit = HTMLWriter.addElement('i', taskNav);
        HTMLWriter.addClass(navElementEdit, 'fas');
        HTMLWriter.addClass(navElementEdit, 'fa-pencil-alt');
        HTMLWriter.addClass(navElementEdit, 'nav-list-icon');
        HTMLWriter.changeId(navElementEdit, 'delete-task-button');
        navElementEdit.addEventListener('click', ActionController.openEditTaskWindow)
        let navElementTrash = HTMLWriter.addElement('i', taskNav);
        HTMLWriter.addClass(navElementTrash, 'fas');
        HTMLWriter.addClass(navElementTrash, 'fa-trash');
        HTMLWriter.addClass(navElementTrash, 'nav-list-icon');
        HTMLWriter.changeId(navElementTrash, 'edit-task-button')
        navElementTrash.addEventListener('click', ActionController.deleteTask);

        NavigationSwipeController.addSwipe(taskShapeElement);
        taskShapeElement.addEventListener('click', ActionController.switchList);
    }

    static getValuesOf(hashArray) {
        let array = [];

        for (let item in hashArray) {
            if (hashArray.hasOwnProperty(item)) {
                array.push(hashArray[item]);
            }
        }

        return array;
    }

    static getWeakDay(dueDate) {
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

    static toggleTaskListCreatePrompt() {
        CreatePromptController.instance.toggle();
    }
}

export {HTMLWriter}