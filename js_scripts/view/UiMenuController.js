class UiMenuController {

    constructor() {
        this.uiMenus = [];
    }

    get(name) {
        return this.uiMenus.filter((uiMenu) => {
            return uiMenu.name === name;
        })[0];
    }

    push(uiMenu) {
        this.uiMenus.push(uiMenu);
    }

    initiateCurrentMenu(name) {
        this.currentMenu = this.get(name)
    }

    switchUiTo(uiMenu, animation) {
        uiMenu.htmlElement.style.display = 'flex';
        setTimeout(() => {
            this.currentMenu.htmlElement.style.display = 'none';
            uiMenu.htmlElement.style.opacity = '1';
            animation();
            this.currentMenu.htmlElement.style.opacity = '0';
            this.currentMenu = uiMenu;
        }, 10)
    }
}

export {UiMenuController};