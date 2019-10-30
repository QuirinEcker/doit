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

    static buildHTMLFor(currentUser) {
        HTMLWriter.getValuesOf(currentUser.taskLists).forEach((item) => {
            HTMLWriter.addTaskList(item)
        })
    }

    static addTaskList(taskList) {
        // let taskListContainer = document.querySelector('#home #task-lists #task-lists-container');
        // let taskListElement = HTMLWriter.addElement('div', taskListContainer);
        // HTMLWriter.addClass(taskListElement, 'task-list');
        // let taskListShapeElement = HTMLWriter.addElement('div', taskListElement);
        // HTMLWriter.addClass(taskListShapeElement, 'list-shape')
        // let taskListNavElement = HTMLWriter.addElement('div', taskListElement);
        // HTMLWriter.addClass(taskListNavElement, 'list-nav')
        // let navElement = HTMLWriter.addElement('i', taskListNavElement);
        // HTMLWriter.addClass(navElement, 'fas');
        // HTMLWriter.addClass(navElement, 'fa-trash');
        //
        // HTMLWriter.overWriteElementTextContent(taskListShapeElement, taskList.name);

    }

    static getValuesOf(hashArray) {
        let array = [];

        for (let item in hashArray) {
            array.push(hashArray[item]);
        }

        return array;
    }
}

export {HTMLWriter}