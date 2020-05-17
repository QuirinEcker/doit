class CreatePromptController {
    constructor() {
        this.visible = false;
        this.createPrompt = document.querySelector('#create-prompt');
    }


    toggle() {
        if (this.visible === true) {
            this.turnOff()
        } else if (this.visible === false) {
            this.turnOn()
        }
    }

    turnOff() {
        this.visible = false;
        this.createPrompt.children[0].children[0].textContent = '';
        this.createPrompt.style.display = 'none'
    }

    turnOn() {
        this.visible = true;
        this.createPrompt.style.display = 'flex'
        const createPromptField = document.querySelector(`#create-taskList-prompt-text-field`);
        createPromptField.value = ""
    }
}

CreatePromptController.instance = new CreatePromptController();

export {CreatePromptController}