class CreatePromptController {
    constructor() {
        this.visible = false;
    }


    toggle() {
        let createPrompt = document.querySelector('create-prompt');

        if (this.visible === true) {
            this.visible = false;
            createPrompt.children[0].children[0].textContent = '';
            createPrompt.style.display = 'none'
        } else if (this.visible === false) {
            this.visible = true;
            createPrompt.style.display = 'flex'
        }
    }

    turnOff(createPrompt) {
        this.visible = false;
        createPrompt.children[0].children[0].textContent = '';
        createPrompt.style.display = 'none'
    }

    turnOn(createPrompt) {
        this.visible = true;
        createPrompt.style.display = 'flex'
    }
}

CreatePromptController.instance = new CreatePromptController();