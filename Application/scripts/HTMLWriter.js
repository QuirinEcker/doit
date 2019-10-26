class HTMLWriter {
    static overWriteElement(elementSelector, text) {
        let element = document.querySelector(elementSelector);
        element.textContent = text;
    }

    static addElement(type, parentElementSelector) {
        let element = document.createElement(type);
        let parentElement = document.querySelector(parentElementSelector);
        parentElement.appendChild(element);
        return element;
    }

    static changeId(elementSelector, id){
        let element = document.querySelector(elementSelector);
        element.id = id;
    }

    static addClass(elementSelector, className) {
        let element = document.querySelector(elementSelector);
        element.classList.add(className);
    }


}