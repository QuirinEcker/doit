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

    static printArrayInto(elementOrSelector, elements, seperator) {
        let endString = '';

        if (seperator === null) {
            elements.forEach((element) => {
                endString += element;
            });
        } else {
            elements.forEach((element) => {
                endString += element;
                endString += ' ';
            });
        }

        HTMLWriter.getElement(elementOrSelector).textContent = endString;
    }
}

export {HTMLWriter}