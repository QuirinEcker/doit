class HTMLWriter {
    static changeValueOf(elementOrSelector, value) {
        if (typeof elementOrSelector === "string") {
            let element = document.querySelector(elementOrSelector);
            element.value = value;
        } else {
            elementOrSelector.value = value;
        }
    }

    static clearValueOf(elementOrSelector) {
        HTMLWriter.changeValueOf(elementOrSelector, '');
    }

    static overWriteElementTextContent(elementOrSelector, text) {
        if (typeof elementOrSelector === "string") {
            let element = document.querySelector(elementOrSelector);
            element.textContent = text;
        } else {
            elementOrSelector.textContent = text;
        }
    }

    static addElement(type, parentElementSelector) {
        let element = document.createElement(type);
        let parentElement = document.querySelector(parentElementSelector);
        parentElement.appendChild(element);
        return element;
    }

    static changeId(elementOrSelector, id){
        if (typeof elementOrSelector === "string") {
            let element = document.querySelector(elementOrSelector);
            element.id = id;
        } else {
            elementOrSelector.id = id;
        }
    }

    static addClass(elementOrSelector, className) {
        if (typeof elementOrSelector === "string") {
            let element = document.querySelector(elementOrSelector);
            element.classList.add(className);
        } else {
            elementOrSelector.classList.add(className);
        }
    }

    static clearAllElementIn(elementOrSelector) {
        if (typeof elementOrSelector == "string") {
            let element = document.querySelector(elementOrSelector);
            while (element.children.length != 0) {
                element.removeChild(element.lastChild);
            }
        } else {
            while (elementOrSelector.children.length != 0) {
                elementOrSelector.removeChild(elementOrSelector.lastChild);
            }
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

}

export {HTMLWriter}