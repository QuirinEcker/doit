export class UiWindow {
    constructor(name, htmlElement, height) {
        this.name = name;
        this.htmlElement = htmlElement;
        this.initiateEventHandler();
        this.height = height;
    }

    open() {
        const windowBackground = this.htmlElement.children[0];
        const windowShape = this.htmlElement.children[1];

        this.htmlElement.style.display = 'flex'

        setTimeout(() => {
            windowShape.style.width = '50%';
            windowShape.style.height = this.height;
            windowBackground.style.backgroundColor = 'rgba(0,0,0,0.5)'
        }, 500)
    }

    close() {
        const windowBackground = this.htmlElement.children[0];
        const windowShape = this.htmlElement.children[1];

        windowShape.style.width = '0';
        windowShape.style.height = '0';
        windowBackground.style.backgroundColor = 'rgba(0,0,0,0.0)'

        setTimeout(() => {
            this.htmlElement.style.display = 'none'
        }, 500)
    }

    initiateEventHandler() {
        const windowBackground = this.htmlElement.children[0];
        windowBackground.addEventListener('click', () => this.close());
    }
}