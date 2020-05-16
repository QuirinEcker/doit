export class UiWindow {
    constructor(name, htmlElement) {
        this.name = name;
        this.htmlElement = htmlElement;
        this.initiateEventHandler();
    }

    open() {

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
        console.log(this.htmlElement);
        const windowBackground = this.htmlElement.children[0];
        windowBackground.addEventListener('click', () => this.close());
    }
}