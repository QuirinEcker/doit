export class UiWindowController {
    constructor() {
        this.uiWindows = [];
        this.currentUiWindow = null;
    }

    closeCurrentWindow() {

    }

    openWindow(name) {
        this.uiWindows[name].open();
    }
}

UiWindowController.instance = new UiWindowController();