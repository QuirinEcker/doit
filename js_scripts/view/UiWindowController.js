export class UiWindowController {
    constructor() {
        this.uiWindows = [];
        this.currentUiWindow = null;
    }

    closeCurrentWindow() {

    }

    openWindow(name) {
        this.currentUiWindow = this.uiWindows[name];
        this.uiWindows[name].open();
    }

    initiateWindow(uiWindow) {
        this.uiWindows[uiWindow.name] = uiWindow;
    }
}

UiWindowController.instance = new UiWindowController();