class HTMLWriter {
    static overWriteElement(elementOrSelector, text) {
        if (elementOrSelector === typeof String) {
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
        if (elementOrSelector === typeof String) {
            let element = document.querySelector(elementOrSelector);
            element.id = id;
        } else {
            elementOrSelector.id = id;
        }
    }

    static addClass(elementOrSelector, className) {
        if (elementOrSelector === typeof String) {
            let element = document.querySelector(elementOrSelector);
            element.classList.add(className);
        } else {
            elementOrSelector.classList.add(className);
        }
    }
}

export {HTMLWriter}